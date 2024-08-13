import prisma from '@/prisma';
import { PAGE_SIZE } from '@/utils/constants';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(PAGE_SIZE),
  keywords: z.string().optional(),
  deleted: z.union([z.literal('true'), z.literal('false')]).optional(),
  fan_count: z.union([z.literal('asc'), z.literal('desc')]).optional(),
  follow_count: z.union([z.literal('asc'), z.literal('desc')]).optional(),
  original_count: z.union([z.literal('asc'), z.literal('desc')]).optional(),
  reprinted_count: z.union([z.literal('asc'), z.literal('desc')]).optional(),
  created_time: z.union([z.literal('asc'), z.literal('desc')]).optional(),
});

/**
 * @description 分页获取用户列表
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
    keywords,
    deleted,
    fan_count,
    follow_count,
    original_count,
    reprinted_count,
    created_time,
  } = verifyRes.data;

  // 构建过滤条件
  const where: any = {};
  if (keywords) {
    where.OR = [{ username: { contains: keywords } }];
  }
  if (deleted !== undefined) {
    where.status = deleted === 'true' ? 1 : 0;
  }

  // 构建排序条件
  const orderBy: any = {};
  if (fan_count) orderBy.fan_count = fan_count;
  if (follow_count) orderBy.follow_count = follow_count;
  if (original_count) orderBy.origin_count = original_count;
  if (reprinted_count) orderBy.reprinted_count = reprinted_count;
  if (created_time) orderBy.created_time = created_time;

  const userList = await prisma.users.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
    select: {
      id: true,
      username: true,
      email: true,
      background_img: true,
      avatar: true,
      signature: true,
      gender: true,
      fan_count: true,
      follow_count: true,
      origin_count: true,
      reprinted_count: true,
      created_time: true,
      status: true,
    },
  });

  const result = userList.map((user) => ({
    ...user,
    created_time: dayjs(user.created_time).format('YYYY/MM/DD'),
  }));

  return NextResponse.json(result, { status: 200 });
}
