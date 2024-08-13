import prisma from '@/prisma';
import * as p from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  id: z.string().optional(),
  value: z.string().optional(),
});

/**
 * @description 获取标签数量
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { id, value } = verifyRes.data;

  // 构建过滤条件
  const where: p.Prisma.labelsWhereInput = {};
  if (id) where.id = id;
  if (value) where.value = { contains: value };

  const count = await prisma.labels.count({ where });

  return NextResponse.json(count, { status: 200 });
}
