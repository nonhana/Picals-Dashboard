import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ObjSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1).max(2047),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const verifyRes = ObjSchema.safeParse(body);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid body parameters', { status: 400 });
  }

  const { id, content } = verifyRes.data;

  await prisma.comments.update({
    where: { id },
    data: { content },
  });

  return NextResponse.json('success', { status: 200 });
}
