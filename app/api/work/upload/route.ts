import prisma from '@/prisma';
import generateThumbnail from '@/utils/img-handler/thumbnail';
import urlToImage from '@/utils/img-handler/urlToImage';
import * as p from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ObjSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(63),
  intro: z.string().max(2047),
  reprintType: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  openComment: z.union([z.literal(0), z.literal(1)]),
  isAIGenerated: z.union([z.literal(0), z.literal(1)]),
  imgList: z.array(z.string()),
  original_url: z.string().nullable(),
  illustrator_id: z.string().nullable(),
  illustrator_name: z.string().nullable(),
  status: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  labels: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  author_id: z.string(),
  author_name: z.string(),
});

/**
 * @description 上传/更新插画信息
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const verifyRes = ObjSchema.safeParse(body);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid body parameters', { status: 400 });
  }

  const { id, ...info } = verifyRes.data;

  if (id) {
    const data: p.Prisma.illustrationsUpdateInput = {
      ...info,
      imgList: info.imgList.join(','),
    };

    const prevWork = await prisma.illustrations.findUnique({
      where: { id },
      select: {
        imgList: true,
        reprintType: true,
        illustrators: { select: { id: true, work_count: true } },
      },
    });
    if (!prevWork) {
      return NextResponse.json('Work Not found', { status: 404 });
    }

    //#region 更新标签
    const existingLabelIds = await prisma.illustrations_labels_labels.findMany({
      where: { illustrationsId: id },
      select: { labelsId: true },
    });

    const existingLabelIdSet = new Set(existingLabelIds.map((l) => l.labelsId));
    const newLabelIdSet = new Set(info.labels.map((l) => l.value));

    const labelsToDelete = Array.from(existingLabelIdSet).filter(
      (id) => !newLabelIdSet.has(id)
    );

    const labelsToCreate = Array.from(newLabelIdSet).filter(
      (id) => !existingLabelIdSet.has(id)
    );

    if (labelsToDelete.length) {
      data.illustrations_labels_labels = {
        deleteMany: labelsToDelete.map((labelId) => ({
          illustrationsId: id,
          labelsId: labelId,
        })),
      };
    }

    if (labelsToCreate.length) {
      data.illustrations_labels_labels = {
        create: labelsToCreate.map((id) => ({
          labels: { connect: { id } },
        })),
      };
    }
    //#endregion

    //#region 更新图片
    const prevImgList = prevWork.imgList.split(',');

    // 1. 处理封面
    if (prevImgList[0] !== info.imgList[0]) {
      const coverSourceUrl = info.imgList[0];
      const fileName = coverSourceUrl.split('/').pop()!.split('.')[0];
      const imgBuffer = await fetch(coverSourceUrl).then((res) =>
        res.arrayBuffer()
      );
      const coverUrl = await generateThumbnail(imgBuffer, fileName, 'cover');
      data.cover = coverUrl as string;
    }

    // 2. 处理变更后的图片列表
    const newImgList = info.imgList.filter((img) => !prevImgList.includes(img));
    const delImgList = prevImgList.filter((img) => !info.imgList.includes(img));

    // 将新的图片存入Image表中
    for (const imgUrl of newImgList) {
      await urlToImage(imgUrl, id);
    }
    // 删除不再使用的图片
    for (const imgUrl of delImgList) {
      await prisma.images.deleteMany({
        where: { originUrl: imgUrl },
      });
    }
    //#endregion

    //#region 更新插画师
    if (info.illustrator_id) {
      const illustratorEntity = await prisma.illustrators.findUnique({
        where: { id: info.illustrator_id },
        select: { id: true, work_count: true },
      });
      if (!prevWork.illustrators) {
        illustratorEntity!.work_count++;
      } else if (prevWork.illustrators.id !== illustratorEntity!.id) {
        prevWork.illustrators.work_count--;
        await prisma.illustrators.update({
          where: { id: prevWork.illustrators.id },
          data: { work_count: prevWork.illustrators.work_count },
        });
        illustratorEntity!.work_count++;
      }
      await prisma.illustrators.update({
        where: { id: info.illustrator_id },
        data: { work_count: illustratorEntity!.work_count },
      });
      data.illustrators = { connect: { id: info.illustrator_id } };
    }
    //#endregion

    //#region 更新用户数据
    if (data.reprintType !== 0) {
      if (prevWork.reprintType === 0) {
        await prisma.users.update({
          where: { id: info.author_id },
          data: {
            origin_count: { decrement: 1 },
            reprinted_count: { increment: 1 },
          },
        });
      }
    } else {
      if (prevWork.reprintType !== 0) {
        await prisma.users.update({
          where: { id: info.author_id },
          data: {
            origin_count: { increment: 1 },
            reprinted_count: { decrement: 1 },
          },
        });
      }
    }
    data.users = { connect: { id: info.author_id } };
    //#endregion

    // 删除不必要的字段
    delete (data as any).labels;
    delete (data as any).illustrator_id;
    delete (data as any).illustrator_name;
    delete (data as any).author_id;
    delete (data as any).author_name;

    await prisma.illustrations.update({ where: { id }, data });
  } else {
    // 新增插画
    const data: p.Prisma.illustrationsCreateInput = {
      ...info,
      cover: '',
      imgList: info.imgList.join(','),
    };

    // 处理标签
    data.illustrations_labels_labels = {
      create: info.labels.map((label) => ({
        labels: { connect: { id: label.value } },
      })),
    };

    // 处理图片
    const coverSourceUrl = info.imgList[0];
    const fileName = coverSourceUrl.split('/').pop()!.split('.')[0];
    const imgBuffer = await fetch(coverSourceUrl).then((res) =>
      res.arrayBuffer()
    );
    const coverUrl = await generateThumbnail(imgBuffer, fileName, 'cover');
    data.cover = coverUrl as string;

    // 处理插画师
    if (info.illustrator_id) {
      data.illustrators = { connect: { id: info.illustrator_id } };
      await prisma.illustrators.update({
        where: { id: info.illustrator_id },
        data: { work_count: { increment: 1 } },
      });
    }

    // 处理用户数据
    await prisma.users.update({
      where: { id: info.author_id },
      data:
        info.reprintType !== 0
          ? {
              reprinted_count: { increment: 1 },
            }
          : {
              origin_count: { increment: 1 },
            },
    });
    data.users = { connect: { id: info.author_id } };

    // 删除不必要的字段
    delete (data as any).labels;
    delete (data as any).illustrator_id;
    delete (data as any).illustrator_name;
    delete (data as any).author_id;
    delete (data as any).author_name;

    await prisma.illustrations.create({ data });
  }

  return NextResponse.json('success', { status: 200 });
}
