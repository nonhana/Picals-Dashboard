import type {
  IGetUserCountReq,
  IGetUserListReq,
  IGetUserListRes,
} from '@/types/api';
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

/**
 * @description 获取用户总数
 */
export const getUserCountAPI = async (
  data: IGetUserCountReq
): Promise<number | null> => {
  try {
    const query = new URLSearchParams(
      data as Record<string, string>
    ).toString();
    const res = await http<number>(`/api/user/count?${query}`);
    if (res.code === 200) {
      return res.data || null;
    } else {
      console.error('Failed to fetch user count:', res.message);
      return null;
    }
  } catch (error) {
    console.error('Request error:', error);
    return null;
  }
};
