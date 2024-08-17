import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  illustrator_id: z.string(),
});

/**
 * @description 获取单个插画家信息
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { illustrator_id } = verifyRes.data;

  const illustratorInfo = await prisma.illustrators.findUnique({
    where: {
      id: illustrator_id,
    },
    select: {
      id: true,
      name: true,
      avatar: true,
      intro: true,
      home_url: true,
      status: true,
    },
  });

  return NextResponse.json(illustratorInfo, { status: 200 });
}
