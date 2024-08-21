import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ObjSchema = z.object({
  id: z.string().optional(),
  value: z.string().min(1).max(31),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  cover: z
    .string()
    .regex(/https:\/\/moe\.nonhana\.pics\/images\/.+/)
    .nullable(),
});

/**
 * @description 更新/新建标签信息
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const verifyRes = ObjSchema.safeParse(body);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid body parameters', { status: 400 });
  }

  const { id, ...info } = verifyRes.data;

  if (id) {
    await prisma.labels.update({
      where: { id },
      data: { ...info },
    });
  } else {
    await prisma.labels.create({
      data: { ...info },
    });
  }

  return NextResponse.json('success', { status: 200 });
}
