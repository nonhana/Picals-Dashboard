import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  work_id: z.string(),
});

/**
 * @description 获取单个作品信息
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { work_id } = verifyRes.data;

  const workInfo = await prisma.illustrations.findUnique({
    where: {
      id: work_id,
    },
    select: {
      id: true,
      name: true,
      intro: true,
      reprintType: true,
      openComment: true,
      isAIGenerated: true,
      imgList: true,
      cover: true,
      original_url: true,
      like_count: true,
      view_count: true,
      collect_count: true,
      comment_count: true,
      created_time: true,
      updated_time: true,
      user_id: true,
      illustrator_id: true,
      status: true,
      illustrations_labels_labels: {
        select: {
          labels: {
            select: {
              id: true,
              value: true,
            },
          },
        },
      },
    },
  });

  if (!workInfo) {
    return NextResponse.json('Work not found', { status: 404 });
  }

  const result: Record<string, any> = { ...workInfo };

  result.labels = workInfo.illustrations_labels_labels.map((label) => ({
    label: label.labels.value,
    value: label.labels.id,
  }));
  delete result.illustrations_labels_labels;

  result.imgList = workInfo.imgList.split(',');

  if (workInfo.user_id) {
    const user_name = await prisma.users.findUnique({
      where: {
        id: workInfo.user_id,
      },
      select: {
        username: true,
      },
    });
    result.user_name = user_name?.username;
  }

  if (workInfo.illustrator_id) {
    const illustrator_name = await prisma.illustrators.findUnique({
      where: {
        id: workInfo.illustrator_id,
      },
      select: {
        name: true,
      },
    });
    result.illustrator_name = illustrator_name?.name;
  }

  return NextResponse.json(result, { status: 200 });
}
