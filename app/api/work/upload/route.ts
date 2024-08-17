import prisma from '@/prisma';
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

    if (info.illustrator_id) {
      data.illustrators = { connect: { id: info.illustrator_id } };
    }

    delete (data as any).labels;
    delete (data as any).illustrator_id;
    delete (data as any).illustrator_name;

    await prisma.illustrations.update({ where: { id }, data });
  } else {
    // await prisma.illustrations.create({
    //   data: {
    //     ...info,
    //     imgList: info.imgList.join(','),
    //   },
    // });
  }

  return NextResponse.json(null, { status: 200 });
}
