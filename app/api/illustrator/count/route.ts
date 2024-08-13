import prisma from '@/prisma';
import * as p from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  deleted: z.enum(['true', 'false']).optional(),
});

/**
 * @description 获取插画家总数
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { id, name, deleted } = verifyRes.data;

  const where: p.Prisma.illustratorsWhereInput = {};
  if (id) where.id = id;
  if (name) where.name = { contains: name };
  if (deleted !== undefined) {
    where.status = deleted === 'true' ? 1 : 0;
  }

  const count = await prisma.illustrators.count({ where });
  return NextResponse.json(count, { status: 200 });
}
