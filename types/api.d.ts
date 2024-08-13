import type { IllustrationItem, LabelItem, UserItem } from '.';

export type BaseRes<T> = {
  code: number;
  message: string;
  data?: T;
};

export type IGetUserListRes = UserItem[];

export type IGetWorkListRes = IllustrationItem[];

export type IGetLabelListRes = LabelItem[];
