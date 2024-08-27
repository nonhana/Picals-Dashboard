import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  admin_id: z.string(),
});

/**
 * @description 获取管理员详细信息
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { admin_id } = verifyRes.data;

  const adminInfo = await prisma.admins.findUnique({
    where: { id: admin_id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      status: true,
    },
  });

  return NextResponse.json(adminInfo, { status: 200 });
}
