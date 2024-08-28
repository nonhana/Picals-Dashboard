import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ObjSchema = z.object({
  admin_id: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const verifyRes = ObjSchema.safeParse(body);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid body parameters', { status: 400 });
  }

  const { admin_id } = verifyRes.data;

  await prisma.illustrations.delete({
    where: { id: admin_id },
  });

  return NextResponse.json('success', { status: 200 });
}
