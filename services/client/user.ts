import type { IGetUserListReq, IGetUserListRes } from '@/types/api';
import request from '..';

/**
 * @description 分页获取用户列表
 */
export const getUserListAPI = async (data: IGetUserListReq) => {
  const query = new URLSearchParams(data).toString();
  const res = await request<IGetUserListRes>(`/api/user/list?${query}`);
  return res;
};
