import prisma from '@/prisma';
import { PAGE_SIZE } from '@/utils/constants';
import * as p from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(PAGE_SIZE),
  id: z.string().optional(),
  value: z.string().optional(),
  work_count: z.enum(['asc', 'desc']).optional(),
});

/**
 * @description 分页获取标签列表
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { page, pageSize, id, value, work_count } = verifyRes.data;

  // 构建过滤条件
  const where: p.Prisma.labelsWhereInput = {};
  if (id) where.id = id;
  if (value) where.value = { contains: value };

  // 构建排序条件
  const orderBy: any = {};
  if (work_count) orderBy.work_count = work_count;

  const labelList = await prisma.labels.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
  });

  return NextResponse.json(labelList, { status: 200 });
}
