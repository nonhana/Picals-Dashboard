import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: File | null = formData.get('image') as File;

  if (!file) {
    return NextResponse.json('Cannot detect file, please reselect', {
      status: 400,
    });
  }

  const fileName = file.name;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadPath = path.join(
    process.cwd(),
    'uploads',
    `${Date.now()}-${fileName}`
  );
  fs.writeFileSync(uploadPath, buffer);
  return NextResponse.json(uploadPath, { status: 200 });
}
