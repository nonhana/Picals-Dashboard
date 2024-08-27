import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ObjSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(31),
  email: z.string().email(),
  status: z.union([z.literal(0), z.literal(1)]),
  image: z.string().url().nullable(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const verifyRes = ObjSchema.safeParse(body);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid body parameters', { status: 400 });
  }

  const { id, ...info } = verifyRes.data;

  await prisma.admins.update({
    where: { id },
    data: { ...info },
  });

  return NextResponse.json(null, { status: 200 });
}
