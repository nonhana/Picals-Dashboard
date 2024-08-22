import prisma from '@/prisma';
import { PAGE_SIZE } from '@/utils/constants';
import * as p from '@prisma/client';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(PAGE_SIZE),
  content: z.string().optional(),
  user_name: z.string().optional(),
  work_id: z.string().optional(),
  level: z.enum(['0', '1']).optional(),
  createTime: z.enum(['asc', 'desc']).optional(),
});

/**
 * @description 分页获取评论列表
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { page, pageSize, user_name, work_id, content, level, createTime } =
    verifyRes.data;

  // 构建过滤条件
  const where: p.Prisma.commentsWhereInput = {};
  if (content) where.content = { contains: content };
  if (user_name)
    where.users_comments_user_idTousers = {
      username: { contains: user_name },
    };
  if (work_id) where.illustration_id = work_id;
  if (level) where.level = Number(level);

  // 构建排序条件
  const orderBy: any = {};
  if (createTime) orderBy.createTime = createTime;

  const commentList = await prisma.comments.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
    select: {
      id: true,
      content: true,
      level: true,
      createTime: true,
      users_comments_user_idTousers: { select: { username: true } },
    },
  });
  const result = commentList.map((comment) => ({
    id: comment.id,
    content: comment.content,
    level: comment.level,
    createTime: dayjs(comment.createTime).format('YYYY/MM/DD'),
    user_name: comment.users_comments_user_idTousers
      ? comment.users_comments_user_idTousers.username
      : '',
  }));

  return NextResponse.json(result, { status: 200 });
}
