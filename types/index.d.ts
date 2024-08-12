import type { illustrations, users } from '@prisma/client';

export interface SelectOption {
  label: string;
  value: string;
  multiple?: boolean;
  options: {
    label: string;
    value: number | string;
  }[];
}

export type IllustrationFormInfo = Omit<
  illustrations,
  | 'id'
  | 'like_count'
  | 'view_count'
  | 'collect_count'
  | 'comment_count'
  | 'created_time'
  | 'updated_time'
  | 'cover'
>;

export type UserItem = Omit<
  users,
  | 'password'
  | 'created_time'
  | 'updated_time'
  | 'little_avatar'
  | 'like_count'
  | 'collect_count'
  | 'favorite_count'
> & { created_time: string };
