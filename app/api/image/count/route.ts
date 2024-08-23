import prisma from '@/prisma';
import * as p from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  work_id: z.string().optional(),
  origin_size_level: z.coerce
    .number()
    .refine((val) => [0, 1, 2].includes(val))
    .optional(),
  thumbnail_size_level: z.coerce
    .number()
    .refine((val) => [0, 1, 2].includes(val))
    .optional(),
});

/**
 * @description 获取图片总数
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { work_id, origin_size_level, thumbnail_size_level } = verifyRes.data;

  const where: p.Prisma.imagesWhereInput = {};
  if (work_id) {
    where.illustration_id = work_id;
  }
  if (origin_size_level !== undefined) {
    if (origin_size_level === 0) {
      where.originSize = { lte: 5 * 1024 };
    } else if (origin_size_level === 1) {
      where.originSize = { gt: 5 * 1024, lte: 10 * 1024 };
    } else {
      where.originSize = { gt: 10 * 1024 };
    }
  }
  if (thumbnail_size_level !== undefined) {
    if (thumbnail_size_level === 0) {
      where.thumbnailSize = { lte: 0.5 * 1024 };
    } else if (thumbnail_size_level === 1) {
      where.thumbnailSize = { gt: 0.5 * 1024, lte: 1 * 1024 };
    } else {
      where.thumbnailSize = { gt: 1 * 1024 };
    }
  }

  const imageList = await prisma.images.count({ where });

  return NextResponse.json(imageList, { status: 200 });
}
