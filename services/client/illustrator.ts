import type { IGetIllustratorListRes } from '@/types/api';
import http from '..';

/**
 * @description 分页获取插画家列表
 */
export const getIllustratorListAPI = async (
  data: Record<string, string>
): Promise<IGetIllustratorListRes | null> => {
  try {
    const query = new URLSearchParams(
      data as Record<string, string>
    ).toString();
    const res = await http<IGetIllustratorListRes>(
      `/api/illustrator/list?${query}`
    );
    if (res.code === 200) {
      return res.data || null;
    } else {
      console.error('Failed to fetch illustrator list:', res.message);
      return null;
    }
  } catch (error) {
    console.error('Request error:', error);
    return null;
  }
};

/**
 * @description 获取插画家总数
 */
export const getIllustratorCountAPI = async (
  data: Record<string, string>
): Promise<number | null> => {
  try {
    const query = new URLSearchParams(
      data as Record<string, string>
    ).toString();
    const res = await http<number>(`/api/illustrator/count?${query}`);
    if (res.code === 200) {
      return res.data || null;
    } else {
      console.error('Failed to fetch illustrator count:', res.message);
      return null;
    }
  } catch (error) {
    console.error('Request error:', error);
    return null;
  }
};
