import type { IGetCommentListRes } from '@/types/api';
import { getHandler } from './methods/GET';

/**
 * @description 分页获取评论列表
 */
export const getCommentListAPI =
  getHandler<IGetCommentListRes>('/api/comment/list');

/**
 * @description 获取插画家总数
 */
export const getCommentCountAPI = getHandler<number>('/api/comment/count');
