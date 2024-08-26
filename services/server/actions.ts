'use server'; // Server Actions 只在服务端执行

import { auth, signIn } from '@/auth';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import { AuthError } from 'next-auth';
import { z } from 'zod';

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

export async function register(formData: FormData) {
  try {
    const body = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    const parsedBody = z
      .object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse(body);
    if (parsedBody.success) {
      const { username, email, password } = parsedBody.data;
      const existedUser = await prisma.admins.findFirst({ where: { email } });
      if (existedUser) return 'Email already registered, please sign in.';
      const hashedPsd = await bcrypt.hash(password, 10);
      await prisma.admins.create({
        data: {
          name: username,
          email,
          password: hashedPsd,
        },
      });
      await signIn('credentials', { email, password });
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

export async function getUserInfo() {
  const session = await auth();
  if (!session) {
    throw new Error('No session found');
  }
  const user = session.user;
  return {
    username: user?.name || '',
    email: user?.email || '',
    avatar: user?.image || '',
  };
}
