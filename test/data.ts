import type { users } from '@prisma/client';

// TODO: status 为临时数据，后续需要从数据库获取类型
type User = Omit<
  users,
  | 'password'
  | 'updated_time'
  | 'little_avatar'
  | 'like_count'
  | 'collect_count'
  | 'favorite_count'
> & { status: number };

export const userTableData: User[] = Array.from({ length: 12 }, (_, index) => ({
  id: String(index),
  username: `user${index}`,
  email: `user${index}@gmail.com`,
  background_img: null,
  avatar: 'https://dummyimage.com/32x32',
  signature: `signature${index}`,
  gender: index % 2,
  fan_count: Math.round(Math.random() * 1000),
  follow_count: Math.round(Math.random() * 1000),
  origin_count: Math.round(Math.random() * 1000),
  reprinted_count: Math.round(Math.random() * 1000),
  created_time: new Date(),
  status: index % 2,
}));
