import prisma from '@/prisma';
import { PAGE_SIZE } from '@/utils/constants';
import * as p from '@prisma/client';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(PAGE_SIZE),
  name: z.string().optional(),
  email: z.string().optional(),
  created_at: z.union([z.literal('asc'), z.literal('desc')]).optional(),
});

/**
 * @description 分页获取管理员列表
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { page, pageSize, name, email, created_at } = verifyRes.data;

  // 构建过滤条件
  const where: p.Prisma.adminsWhereInput = {};
  if (name) {
    where.name = { contains: name };
  }
  if (email) {
    where.email = { contains: email };
  }

  // 构建排序条件
  const orderBy: any = {};
  if (created_at) orderBy.created_at = created_at;

  const adminList = await prisma.admins.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      status: true,
      created_at: true,
    },
  });

  const result = adminList.map((admin) => ({
    ...admin,
    created_at: dayjs(admin.created_at).format('YYYY/MM/DD'),
  }));

  return NextResponse.json(result, { status: 200 });
}
