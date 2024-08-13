import prisma from '@/prisma';
import { PAGE_SIZE } from '@/utils/constants';
import * as p from '@prisma/client';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(PAGE_SIZE),
  status: z.coerce
    .number()
    .refine((val) => [0, 1, 2].includes(val))
    .optional(),
  reprintType: z.coerce
    .number()
    .refine((val) => [0, 1, 2].includes(val))
    .optional(),
  id: z.string().optional(),
  user: z.string().optional(),
  illustrator: z.string().optional(),
  label: z.string().optional(),
  like_count: z.enum(['asc', 'desc']).optional(),
  view_count: z.enum(['asc', 'desc']).optional(),
  collect_count: z.enum(['asc', 'desc']).optional(),
  comment_count: z.enum(['asc', 'desc']).optional(),
  created_time: z.enum(['asc', 'desc']).optional(),
});

/**
 * @description 分页获取作品列表
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const {
    page,
    pageSize,
    status,
    reprintType,
    id,
    user,
    illustrator,
    label,
    like_count,
    view_count,
    collect_count,
    comment_count,
    created_time,
  } = verifyRes.data;

  // 构建过滤条件
  const where: p.Prisma.illustrationsWhereInput = {};
  if (status !== undefined) {
    where.status = status;
  }
  if (reprintType !== undefined) {
    where.reprintType = reprintType;
  }
  if (id) {
    where.id = id;
  }
  if (user) {
    where.users = {
      username: user,
    };
  }
  if (illustrator) {
    where.illustrators = {
      name: illustrator,
    };
  }
  if (label) {
    const labels = label.split(',');
    where.illustrations_labels_labels = {
      some: {
        labels: {
          value: {
            in: labels,
          },
        },
      },
    };
  }

  // 构建排序条件
  const orderBy: any = {};
  if (like_count) orderBy.like_count = like_count;
  if (view_count) orderBy.view_count = view_count;
  if (collect_count) orderBy.collect_count = collect_count;
  if (comment_count) orderBy.comment_count = comment_count;
  if (created_time) orderBy.created_time = created_time;

  const workList = await prisma.illustrations.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
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
      status: true,
      users: {
        select: {
          username: true,
        },
      },
      illustrators: {
        select: {
          name: true,
        },
      },
    },
  });

  const result = workList.map((work) => ({
    ...work,
    created_time: dayjs(work.created_time).format('YYYY/MM/DD'),
    imgList: work.imgList.split(','),
    user_name: work.users ? work.users.username : '',
    illustrator_name: work.illustrators ? work.illustrators.name : '',
  }));

  return NextResponse.json(result, { status: 200 });
}
