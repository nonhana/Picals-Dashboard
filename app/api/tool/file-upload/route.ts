import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const suffixGenerator = (origin: string) =>
  Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + origin;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: File | null = formData.get('image') as File;

  if (!file) {
    return NextResponse.json('Cannot detect file, please reselect', {
      status: 400,
    });
  }

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

  console.log('targetPath', targetPath);

  const putCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: targetPath,
    Body: buffer,
  });

  await S3.send(putCommand);

  return NextResponse.json(`https://${process.env.R2_DOMAIN}/${targetPath}`, {
    status: 200,
  });
}
