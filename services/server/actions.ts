'use server'; // Server Actions 只在服务端执行

import { signIn } from '@/auth';
import prisma from '@/prisma';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export async function authenticate(formData: FormData) {
  try {
    console.log('Authenticating');
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
      await prisma.admins.create({
        data: {
          username,
          email,
          password,
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
