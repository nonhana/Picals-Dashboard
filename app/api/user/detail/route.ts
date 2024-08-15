import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  user_id: z.string(),
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

  const { user_id } = verifyRes.data;

  const userInfo = await prisma.users.findUnique({
    where: {
      id: user_id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      background_img: true,
      avatar: true,
      little_avatar: true,
      signature: true,
      gender: true,
      status: true,
    },
  });

  return NextResponse.json(userInfo, { status: 200 });
}
