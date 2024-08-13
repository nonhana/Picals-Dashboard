import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  keywords: z.string().optional(),
  deleted: z.union([z.literal('true'), z.literal('false')]).optional(),
});

/**
 * @description 获取用户总数
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { keywords, deleted } = verifyRes.data;

  const count = await prisma.users.count({
    where: {
      username: {
        contains: keywords,
      },
      status: deleted === 'true' ? 1 : 0,
    },
  });
  return NextResponse.json({ count }, { status: 200 });
}
