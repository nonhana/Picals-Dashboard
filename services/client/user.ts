import type {
  IGetUserDetailRes,
  IGetUserListRes,
  IUpdateUserReq,
} from '@/types/api';
import { getHandler } from './methods/GET';
import { postHandler } from './methods/POST';

/**
 * @description 分页获取用户列表
 */
export const getUserListAPI = getHandler<IGetUserListRes>('/api/user/list');

/**
 * @description 获取用户总数
 */
export const getUserCountAPI = getHandler<number>('/api/user/count');

/**
 * @description 获取用户详情
 */
export const getUserDetailAPI =
  getHandler<IGetUserDetailRes>('/api/user/detail');

/**
 * @description 更新用户信息
 */
export const updateUserAPI = postHandler<IUpdateUserReq, null>(
  '/api/user/update'
);
