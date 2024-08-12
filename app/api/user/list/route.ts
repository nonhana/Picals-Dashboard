import prisma from '@/prisma';
import { PAGE_SIZE } from '@/utils/constant';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(PAGE_SIZE),
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

  const { page, pageSize } = verifyRes.data;

  const userList = await prisma.users.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
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

  return NextResponse.json(
    {
      code: 200,
      message: 'success',
      data: result,
    },
    { status: 200 }
  );
}
