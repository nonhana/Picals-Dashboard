import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ObjSchema = z.object({
  label_id: z.string(),
});

/**
 * @description 删除指定ID的标签
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const verifyRes = ObjSchema.safeParse(body);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid body parameters', { status: 400 });
  }

  const { label_id } = verifyRes.data;

  await prisma.labels.delete({
    where: {
      id: label_id,
    },
  });

  return NextResponse.json('success', { status: 200 });
}
