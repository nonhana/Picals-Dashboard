import {
  IGetAdminDetailRes,
  IGetAdminListRes,
  IUpdateAdminReq,
} from '@/types/api';
import { getHandler } from './methods/GET';
import { postHandler } from './methods/POST';

/**
 * @description 分页获取管理员列表
 */
export const getAdminListAPI = getHandler<IGetAdminListRes>('/api/admin/list');

/**
 * @description 获取管理员总数
 */
export const getAdminCountAPI = getHandler<number>('/api/admin/count');

/**
 * @description 更新管理员信息
 */
export const updateAdminAPI = postHandler<IUpdateAdminReq, string>(
  '/api/admin/update'
);

/**
 * @description 获取管理员详细信息
 */
export const getAdminDetailAPI =
  getHandler<IGetAdminDetailRes>('/api/admin/detail');

/**
 * @description 删除管理员
 */
export const deleteAdminAPI = postHandler<{ admin_id: string }, string>(
  '/api/admin/delete'
);
