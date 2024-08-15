import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ObjSchema = z.object({
  id: z.string(),
  username: z.string().min(1).max(31),
  email: z.string().regex(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/),
  background_img: z
    .string()
    .regex(/https:\/\/moe\.nonhana\.pics\/images\/.+/)
    .nullable(),
  avatar: z.string().regex(/https:\/\/moe\.nonhana\.pics\/images\/.+/),
  little_avatar: z.string().regex(/https:\/\/moe\.nonhana\.pics\/images\/.+/),
  signature: z.string().min(1).max(255),
  gender: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  status: z.union([z.literal(0), z.literal(1)]),
});

/**
 * @description 更新用户信息
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const verifyRes = ObjSchema.safeParse(body);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid body parameters', { status: 400 });
  }

  const { id, ...info } = verifyRes.data;

  await prisma.users.update({
    where: {
      id,
    },
    data: {
      ...info,
    },
  });

  return NextResponse.json(null, { status: 200 });
}
