import type {
  illustrations,
  illustrators,
  labels,
  users,
} from '@prisma/client';

export interface SelectOption {
  label: string;
  value: string;
  multiple?: boolean;
  loadable?: boolean;
  options: {
    label: string;
    value: number | string;
  }[];
}

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

export type UserForm = {
  username: string;
  email: string;
  background_img: string;
  avatar: string;
  little_avatar: string;
  signature: string;
  gender: number;
  status: number;
};

export type IllustrationItem = Omit<
  illustrations,
  | 'imgList'
  | 'created_time'
  | 'updated_time'
  | 'user_id'
  | 'illustrator_id'
  | 'openComment'
  | 'isAIGenerated'
> & {
  imgList: string[];
  user_name: string;
  illustrator_name: string;
  created_time: string;
};

export type IllustrationInfo = {
  id: string;
  name: string;
  intro: string;
  reprintType: number;
  openComment: number;
  isAIGenerated: number;
  cover: string;
  imgList: string[];
  like_count: number;
  view_count: number;
  collect_count: number;
  comment_count: number;
  original_url: string | null;
  illustrator_id: string | null;
  illustrator_name: string | null;
  user_id: string | null;
  user_name: string | null;
  status: number;
  created_time: string;
  updated_time: string;
  labels: {
    label: string;
    value: string;
    color: string;
  }[];
};

export type IllustrationForm = {
  id?: string;
  name: string;
  intro: string;
  reprintType: number;
  openComment: number;
  isAIGenerated: number;
  imgList: string[];
  original_url: string | null;
  illustrator_id: string | null;
  illustrator_name: string | null;
  status: number;
  labels: {
    label: string;
    value: string;
    color: string;
  }[];
  author_id: string;
  author_name: string;
};

export type LabelItem = labels;

export type LabelForm = {
  id?: string;
  value: string;
  color: string;
  cover: string | null;
};

export type IllustratorItem = Omit<
  illustrators,
  'updated_time' | 'created_time'
> & {
  created_time: string;
};

export type IllustratorForm = {
  id?: string;
  name: string;
  intro: string;
  avatar: string | null;
  little_avatar: string | null;
  home_url: string;
  status: number;
};

export type CommentItem = Omit<
  comments,
  | 'res_to_comment_id'
  | 'res_to_user_id'
  | 'createTime'
  | 'user_id'
  | 'illustration_id'
> & {
  createTime: string;
  user_name: string;
};
