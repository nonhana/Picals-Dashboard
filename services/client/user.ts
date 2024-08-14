import type { IGetUserListRes } from '@/types/api';
import { getHandler } from './GET';

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
export const getUserDetailAPI = getHandler<IGetUserListRes>('/api/user/detail');
