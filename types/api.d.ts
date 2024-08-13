import type {
  CommentItem,
  IllustrationItem,
  IllustratorItem,
  LabelItem,
  UserItem,
} from '.';

export type BaseRes<T> = {
  code: number;
  message: string;
  data?: T;
};

export type IGetUserListRes = UserItem[];

export type IGetWorkListRes = IllustrationItem[];

export type IGetLabelListRes = LabelItem[];

export type IGetIllustratorListRes = IllustratorItem[];

export type IGetCommentListRes = CommentItem[];
