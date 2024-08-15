// /api/tool/image-upload/route.ts
// 上传图片至 CF R2 图床并返回图片链接。根据条件生成缩略图。

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

const suffixGenerator = (origin: string) =>
  Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + origin;

export async function POST(req: NextRequest) {
  const result: { origin_url?: string; thumbnail_url?: string } = {};

  const formData = await req.formData();
  const file: File | null = formData.get('image') as File;
  const imageType = formData.get('imageType');

  if (!file) {
    return NextResponse.json('Cannot detect file, please reselect', {
      status: 400,
    });
  }

  // 初始化 S3 客户端
  const S3 = new S3Client({
    region: 'apac',
    endpoint: `https://${process.env.R2_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
  const bucket = process.env.R2_BUCKET;

  const fileName = file.name;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const targetPath = 'images/image-' + suffixGenerator(fileName);

  const putCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: targetPath,
    Body: buffer,
  });

  if (!imageType || (imageType && imageType !== 'background')) {
    await S3.send(putCommand);
    result.origin_url = `https://${process.env.R2_DOMAIN}/${targetPath}`;
  }

  if (imageType) {
    const metadata = await sharp(buffer).metadata();
    if (!metadata.width || !metadata.height) {
      return NextResponse.json('Cannot detect image size', {
        status: 400,
      });
    }
    let leastLength: number;
    if (imageType === 'cover') {
      const maxSide = Math.max(metadata.width, metadata.height);
      leastLength = maxSide < 400 ? maxSide : 400;
    } else if (imageType === 'detail') {
      const maxSide = Math.max(metadata.width, metadata.height);
      leastLength = maxSide < 800 ? maxSide : 800;
    } else if (imageType === 'background') {
      const maxSide = Math.max(metadata.width, metadata.height);
      leastLength = maxSide < 1200 ? maxSide : 1200;
    } else {
      leastLength = 200;
    }

    const newWidth = metadata.width > metadata.height ? null : leastLength;
    const newHeight = metadata.height > metadata.width ? null : leastLength;

    // 使用sharp调整尺寸并压缩质量
    const thumbnailFile = await sharp(buffer)
      .resize(newWidth, newHeight)
      .jpeg({ quality: 80 })
      .toBuffer();

    const thumbnailPath =
      'images/image-' +
      suffixGenerator(
        fileName.split('.')[0] + '-' + imageType + '-thumbnail.jpg'
      );

    const putThumbnailCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: thumbnailPath,
      Body: thumbnailFile,
    });

    await S3.send(putThumbnailCommand);
    result.thumbnail_url = `https://${process.env.R2_DOMAIN}/${thumbnailPath}`;
  }

  return NextResponse.json(result, {
    status: 200,
  });
}
