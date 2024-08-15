import type {
  CommentItem,
  IllustrationForm,
  IllustrationInfo,
  IllustrationItem,
  IllustratorItem,
  LabelItem,
  UserForm,
  UserItem,
} from '.';

export type BaseRes<T> = {
  code: number;
  message: string;
  data?: T;
};

export type IGetUserListRes = UserItem[];

export type IGetUserDetailRes = UserForm;

export type IUpdateUserReq = UserForm;

export type IGetWorkListRes = IllustrationItem[];

export type IGetWorkDetailRes = IllustrationInfo;

export type IUpdateWorkReq = IllustrationForm;

export type IGetLabelListRes = LabelItem[];

export type IGetIllustratorListRes = IllustratorItem[];

export type IGetCommentListRes = CommentItem[];
