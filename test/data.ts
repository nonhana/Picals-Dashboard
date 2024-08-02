import type { illustrations, users } from '@prisma/client';

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

export const userTableData: User[] = Array.from({ length: 30 }, (_, index) => ({
  id: String(index),
  username: `user${index}`,
  email: `user${index}@gmail.com`,
  background_img: null,
  avatar: 'https://dummyimage.com/32x32',
  signature: `signature${index}`,
  gender: index % 2,
  fan_count: index,
  follow_count: index,
  origin_count: index,
  reprinted_count: index,
  created_time: new Date(),
  status: index % 2,
}));

type Illustration = Omit<
  illustrations,
  | 'like_count'
  | 'view_count'
  | 'collect_count'
  | 'comment_count'
  | 'created_time'
  | 'updated_time'
  | 'user_id'
>;

// export const IllustrationTableData: Illustration[] = Array.from(
//   { length: 30 },
//   (_, index) => ({})
// );
