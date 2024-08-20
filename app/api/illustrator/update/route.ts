import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ObjSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(31),
  avatar: z.string().regex(/https:\/\/moe\.nonhana\.pics\/images\/.+/),
  intro: z.string().min(1).max(255),
  home_url: z.string().regex(/https:\/\/moe\.nonhana\.pics\/images\/.+/),
  status: z.union([z.literal(0), z.literal(1)]),
});

/**
 * @description 更新/新建插画家信息
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const verifyRes = ObjSchema.safeParse(body);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid body parameters', { status: 400 });
  }

  const { id, ...info } = verifyRes.data;

  if (id) {
    await prisma.illustrators.update({
      where: { id },
      data: { ...info },
    });
  } else {
    await prisma.illustrators.create({
      data: { ...info },
    });
  }

  return NextResponse.json('success', { status: 200 });
}
