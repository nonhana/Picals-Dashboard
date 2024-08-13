import prisma from '@/prisma';
import * as p from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  content: z.string().optional(),
  user_id: z.string().optional(),
  work_id: z.string().optional(),
  level: z.enum(['0', '1']).optional(),
});

/**
 * @description 获取评论总数
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { content, user_id, work_id, level } = verifyRes.data;

  const where: p.Prisma.commentsWhereInput = {};
  if (content) where.content = { contains: content };
  if (user_id) where.user_id = user_id;
  if (work_id) where.illustration_id = work_id;
  if (level) where.level = Number(level);

  const count = await prisma.comments.count({ where });
  return NextResponse.json(count, { status: 200 });
}
