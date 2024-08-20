// /api/tool/image-upload/route.ts
// 上传图片至 CF R2 图床并返回图片链接。根据条件生成缩略图。

import { suffixGenerator } from '@/utils/helpers';
import S3 from '@/utils/img-handler/S3';
import generateThumbnail from '@/utils/img-handler/thumbnail';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const result: { origin_url?: string; thumbnail_url?: string } = {};

  const formData = await req.formData();
  const file: File | null = formData.get('image') as File;
  const imageType = formData.get('imageType') as
    | 'cover'
    | 'detail'
    | 'avatar'
    | 'background';

  if (!file) {
    return NextResponse.json('Cannot detect file, please reselect', {
      status: 400,
    });
  }

  const fileName = file.name;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const targetPath = 'images/image-' + suffixGenerator(fileName);

  const putCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: targetPath,
    Body: buffer,
  });

  if (!imageType || (imageType && imageType !== 'background')) {
    await S3.send(putCommand);
    result.origin_url = `https://${process.env.R2_DOMAIN}/${targetPath}`;
  }

  if (imageType) {
    result.thumbnail_url = (await generateThumbnail(
      buffer,
      fileName,
      imageType
    )) as string;
  }

  return NextResponse.json(result, {
    status: 200,
  });
}