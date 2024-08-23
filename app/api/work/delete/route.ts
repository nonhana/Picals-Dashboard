import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ObjSchema = z.object({
  work_id: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const verifyRes = ObjSchema.safeParse(body);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid body parameters', { status: 400 });
  }

  const { work_id } = verifyRes.data;

  const work = await prisma.illustrations.findUnique({
    where: { id: work_id },
    select: {
      reprintType: true,
      users: { select: { id: true } },
      illustrators: { select: { id: true } },
      illustrations_labels_labels: { select: { labelsId: true } },
      illustrations_favorites_favorites: { select: { favoritesId: true } },
    },
  });
  if (!work) {
    return NextResponse.json('Work not found', { status: 404 });
  }

  await prisma.users.update({
    where: { id: work.users!.id },
    data:
      work.reprintType !== 0
        ? { reprinted_count: { decrement: 1 } }
        : { origin_count: { decrement: 1 } },
  });

  if (work.illustrators) {
    await prisma.illustrators.update({
      where: { id: work.illustrators.id },
      data: { work_count: { decrement: 1 } },
    });
  }

  for (const label of work.illustrations_labels_labels) {
    await prisma.labels.update({
      where: { id: label.labelsId },
      data: { work_count: { decrement: 1 } },
    });
  }

  for (const favorite of work.illustrations_favorites_favorites) {
    await prisma.favorites.update({
      where: { id: favorite.favoritesId },
      data: { work_count: { decrement: 1 } },
    });
  }

  await prisma.illustrations.delete({
    where: { id: work_id },
  });

  return NextResponse.json('success', { status: 200 });
}
