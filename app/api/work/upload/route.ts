import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ObjSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(63),
  intro: z.string().min(1).max(2047),
  reprintType: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  openComment: z.union([z.literal(0), z.literal(1)]),
  isAIGenerated: z.union([z.literal(0), z.literal(1)]),
  imgList: z.array(
    z.string().regex(/https:\/\/moe\.nonhana\.pics\/images\/.+/)
  ),
  original_url: z
    .string()
    .regex(/https: \/\/.+/)
    .nullable(),
  illustrator_id: z.string().nullable(),
  status: z.union([z.literal(0), z.literal(1), z.literal(2)]),
});

/**
 * @description 上传/更新插画信息
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log('body', body);
  const verifyRes = ObjSchema.safeParse(body);

  console.log('verifyRes', verifyRes);

  if (!verifyRes.success) {
    return NextResponse.json('Invalid body parameters', { status: 400 });
  }

  const { id, ...info } = verifyRes.data;

  if (id) {
    await prisma.illustrations.update({
      where: { id },
      data: {
        ...info,
        imgList: info.imgList.join(','),
      },
    });
  } else {
    // await prisma.illustrations.create({
    //   data: {
    //     ...info,
    //     imgList: info.imgList.join(','),
    //   },
    // });
  }

  return NextResponse.json(null, { status: 200 });
}
