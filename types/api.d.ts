import type {
  CommentForm,
  CommentItem,
  IllustrationForm,
  IllustrationInfo,
  IllustrationItem,
  IllustratorForm,
  IllustratorItem,
  ImageItem,
  LabelForm,
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

export type IUploadWorkReq = IllustrationForm;

export type IGetLabelListRes = LabelItem[];

export type IGetLabelDetailRes = LabelForm;

export type IUploadLabelReq = LabelForm;

export type IGetIllustratorListRes = IllustratorItem[];

export type IUploadIllustratorReq = IllustratorForm;

export type IGetIllustratorDetailRes = IllustratorForm;

export type IGetCommentListRes = CommentItem[];

export type IUpdateCommentReq = CommentForm;

export type IGetImageListRes = ImageItem[];
