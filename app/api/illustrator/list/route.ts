import prisma from '@/prisma';
import { PAGE_SIZE } from '@/utils/constants';
import * as p from '@prisma/client';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(PAGE_SIZE),
  deleted: z.enum(['true', 'false']).optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  work_count: z.enum(['asc', 'desc']).optional(),
  created_time: z.enum(['asc', 'desc']).optional(),
});

/**
 * @description 分页获取插画家列表
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { page, pageSize, deleted, id, name, work_count, created_time } =
    verifyRes.data;

  // 构建过滤条件
  const where: p.Prisma.illustratorsWhereInput = {};
  if (id) where.id = id;
  if (name) where.name = { contains: name };
  if (deleted !== undefined) {
    where.status = deleted === 'true' ? 1 : 0;
  }

  // 构建排序条件
  const orderBy: any = {};
  if (work_count) orderBy.work_count = work_count;
  if (created_time) orderBy.created_time = created_time;

  const illustratorList = await prisma.illustrators.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
    select: {
      id: true,
      name: true,
      avatar: true,
      intro: true,
      home_url: true,
      work_count: true,
      created_time: true,
      status: true,
    },
  });

  const result = illustratorList.map((illustrator) => ({
    ...illustrator,
    created_time: dayjs(illustrator.created_time).format('YYYY/MM/DD'),
  }));

  return NextResponse.json(result, { status: 200 });
}
