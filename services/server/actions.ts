'use server';

import { auth, signIn } from '@/auth';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import { AuthError } from 'next-auth';
import { z } from 'zod';

// 管理员登录
export async function login(formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Sign in failed.';
      }
    }
    throw error;
  }
}

// 管理员注册
export async function register(formData: FormData) {
  try {
    const body = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    const parsedBody = z
      .object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse(body);
    if (parsedBody.success) {
      const { name, email, password } = parsedBody.data;
      const existedUser = await prisma.admins.findFirst({ where: { email } });
      if (existedUser) return 'Email already registered, please sign in.';
      const hashedPsd = await bcrypt.hash(password, 10);
      await prisma.admins.create({
        data: {
          name,
          email,
          password: hashedPsd,
        },
      });
    } else {
      return 'Invalid input.';
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Register failed.';
      }
    }
    throw error;
  }
}

// 获取管理员信息
export async function getUserInfo() {
  const session = await auth();
  if (!session) throw new Error('No session found');
  if (!session.user) throw new Error('No user found');

  const adminInfo = await prisma.admins.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      status: true,
    },
  });
  if (!adminInfo) throw new Error('Failed to get user info');
  return adminInfo;
}

// (test) 手动抛出错误
export async function throwError() {
  throw new Error('This is a test error');
}
