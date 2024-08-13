import type { IGetWorkListRes } from '@/types/api';
import http from '..';

/**
 * @description 分页获取作品列表
 */
export const getWorkListAPI = async (
  data: Record<string, string>
): Promise<IGetWorkListRes | null> => {
  try {
    const query = new URLSearchParams(
      data as Record<string, string>
    ).toString();
    const res = await http<IGetWorkListRes>(`/api/work/list?${query}`);
    if (res.code === 200) {
      return res.data || null;
    } else {
      console.error('Failed to fetch work list:', res.message);
      return null;
    }
  } catch (error) {
    console.error('Request error:', error);
    return null;
  }
};

/**
 * @description 获取作品总数
 */
export const getWorkCountAPI = async (
  data: Record<string, string>
): Promise<number | null> => {
  try {
    const query = new URLSearchParams(
      data as Record<string, string>
    ).toString();
    const res = await http<number>(`/api/work/count?${query}`);
    if (res.code === 200) {
      return res.data || null;
    } else {
      console.error('Failed to fetch work count:', res.message);
      return null;
    }
  } catch (error) {
    console.error('Request error:', error);
    return null;
  }
};
