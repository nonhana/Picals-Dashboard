import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  label_id: z.string(),
});

/**
 * @description 获取单个用户信息
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { label_id } = verifyRes.data;

  const userInfo = await prisma.labels.findUnique({
    where: {
      id: label_id,
    },
    select: {
      id: true,
      value: true,
      color: true,
      cover: true,
      work_count: true,
    },
  });

  return NextResponse.json(userInfo, { status: 200 });
}
