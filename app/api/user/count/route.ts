import prisma from '@/prisma';
import { NextResponse } from 'next/server';

/**
 * @description 获取用户总数
 */
export async function GET() {
  const count = await prisma.users.count();
  return NextResponse.json({ count }, { status: 200 });
}
