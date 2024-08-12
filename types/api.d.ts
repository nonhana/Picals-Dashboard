import type { UserItem } from '.';

export type BaseRes<T> = {
  code: number;
  message: string;
  data?: T;
};

export type IGetUserListReq = {
  page?: number;
  pageSize?: number;
  [key: string]: any;
};

export type IGetUserListRes = UserItem[];
