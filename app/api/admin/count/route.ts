import prisma from '@/prisma';
import * as p from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

/**
 * @description 获取管理员总数
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { name, email } = verifyRes.data;

  const where: p.Prisma.adminsWhereInput = {};
  if (name) {
    where.name = { contains: name };
  }
  if (email) {
    where.email = { contains: email };
  }

  const result = await prisma.admins.count({ where });

  return NextResponse.json(result, { status: 200 });
}
