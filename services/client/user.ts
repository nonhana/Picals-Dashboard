import type { IGetUserListReq, IGetUserListRes } from '@/types/api';
import http from '..';

/**
 * @description 分页获取用户列表
 */
export const getUserListAPI = async (
  data: IGetUserListReq
): Promise<IGetUserListRes | null> => {
  try {
    const query = new URLSearchParams(
      data as Record<string, string>
    ).toString();
    const res = await http<IGetUserListRes>(`/api/user/list?${query}`);
    if (res.code === 200) {
      console.log('User list:', res, res.data);
      return res.data || null;
    } else {
      console.error('Failed to fetch user list:', res.message);
      return null;
    }
  } catch (error) {
    console.error('Request error:', error);
    return null;
  }
};
