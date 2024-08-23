import prisma from '@/prisma';
import { PAGE_SIZE } from '@/utils/constants';
import * as p from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(PAGE_SIZE),
  work_id: z.string().optional(),
  origin_size_level: z.coerce
    .number()
    .refine((val) => [0, 1, 2].includes(val))
    .optional(),
  thumbnail_size_level: z.coerce
    .number()
    .refine((val) => [0, 1, 2].includes(val))
    .optional(),
  originWidth: z.enum(['asc', 'desc']).optional(),
  originHeight: z.enum(['asc', 'desc']).optional(),
  originSize: z.enum(['asc', 'desc']).optional(),
  thumbnailWidth: z.enum(['asc', 'desc']).optional(),
  thumbnailHeight: z.enum(['asc', 'desc']).optional(),
  thumbnailSize: z.enum(['asc', 'desc']).optional(),
});

/**
 * @description 分页获取图片列表
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const {
    page,
    pageSize,
    work_id,
    origin_size_level,
    thumbnail_size_level,
    originWidth,
    originHeight,
    originSize,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailSize,
  } = verifyRes.data;

  // 构建过滤条件
  const where: p.Prisma.imagesWhereInput = {};
  if (work_id) {
    where.illustration_id = work_id;
  }
  // origin_size_level: 0 -> 0-5mb, 1 -> 5-10mb, 2 -> 10mb+
  if (origin_size_level !== undefined) {
    if (origin_size_level === 0) {
      where.originSize = { lte: 5 * 1024 };
    } else if (origin_size_level === 1) {
      where.originSize = { gt: 5 * 1024, lte: 10 * 1024 };
    } else {
      where.originSize = { gt: 10 * 1024 };
    }
  }
  // thumbnail_size_level: 0 -> 0-0.5mb, 1 -> 0.5-1mb, 2 -> 1mb+
  if (thumbnail_size_level !== undefined) {
    if (thumbnail_size_level === 0) {
      where.thumbnailSize = { lte: 0.5 * 1024 };
    } else if (thumbnail_size_level === 1) {
      where.thumbnailSize = { gt: 0.5 * 1024, lte: 1 * 1024 };
    } else {
      where.thumbnailSize = { gt: 1 * 1024 };
    }
  }
  // 构建排序条件
  const orderBy: any = {};
  if (originWidth) orderBy.originWidth = originWidth;
  if (originHeight) orderBy.originHeight = originHeight;
  if (originSize) orderBy.originSize = originSize;
  if (thumbnailWidth) orderBy.thumbnailWidth = thumbnailWidth;
  if (thumbnailHeight) orderBy.thumbnailHeight = thumbnailHeight;
  if (thumbnailSize) orderBy.thumbnailSize = thumbnailSize;

  const imageList = await prisma.images.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where,
    orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
  });

  return NextResponse.json(imageList, { status: 200 });
}
