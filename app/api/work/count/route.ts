import prisma from '@/prisma';
import * as p from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const QuerySchema = z.object({
  status: z.coerce
    .number()
    .refine((val) => [0, 1, 2].includes(val))
    .optional(),
  reprintType: z.coerce
    .number()
    .refine((val) => [0, 1, 2].includes(val))
    .optional(),
  id: z.string().optional(),
  user: z.string().optional(),
  illustrator: z.string().optional(),
  label: z.string().optional(),
});

/**
 * @description 获取插画总数
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const verifyRes = QuerySchema.safeParse(queryParams);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid query parameters', { status: 400 });
  }

  const { status, reprintType, id, user, illustrator, label } = verifyRes.data;

  const labelArr = label ? label.split(',') : [];

  const where: p.Prisma.illustrationsWhereInput = {};
  if (status !== undefined) {
    where.status = status;
  }
  if (reprintType !== undefined) {
    where.reprintType = reprintType;
  }
  if (id) {
    where.id = id;
  }
  if (user) {
    where.users = {
      username: user,
    };
  }
  if (illustrator) {
    where.illustrators = {
      name: illustrator,
    };
  }
  if (label) {
    where.illustrations_labels_labels = {
      some: {
        labels: {
          value: {
            in: labelArr,
          },
        },
      },
    };
  }

  const count = await prisma.illustrations.count({ where });
  return NextResponse.json(count, { status: 200 });
}
