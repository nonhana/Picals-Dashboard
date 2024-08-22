import type { IGetCommentListRes, IUpdateCommentReq } from '@/types/api';
import { getHandler } from './methods/GET';
import { postHandler } from './methods/POST';

/**
 * @description 分页获取评论列表
 */
export const getCommentListAPI =
  getHandler<IGetCommentListRes>('/api/comment/list');

/**
 * @description 获取评论总数
 */
export const getCommentCountAPI = getHandler<number>('/api/comment/count');

/**
 * @description 更新评论内容
 */
export const updateCommentAPI = postHandler<IUpdateCommentReq, string>(
  '/api/comment/update'
);
