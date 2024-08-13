import type { IGetLabelListRes } from '@/types/api';
import http from '..';

/**
 * @description 分页获取标签列表
 */
export const getLabelListAPI = async (
  data: Record<string, string>
): Promise<IGetLabelListRes | null> => {
  try {
    const query = new URLSearchParams(
      data as Record<string, string>
    ).toString();
    const res = await http<IGetLabelListRes>(`/api/label/list?${query}`);
    if (res.code === 200) {
      return res.data || null;
    } else {
      console.error('Failed to fetch label list:', res.message);
      return null;
    }
  } catch (error) {
    console.error('Request error:', error);
    return null;
  }
};

/**
 * @description 获取标签总数
 */
export const getLabelCountAPI = async (
  data: Record<string, string>
): Promise<number | null> => {
  try {
    const query = new URLSearchParams(
      data as Record<string, string>
    ).toString();
    const res = await http<number>(`/api/label/count?${query}`);
    if (res.code === 200) {
      return res.data || null;
    } else {
      console.error('Failed to fetch label count:', res.message);
      return null;
    }
  } catch (error) {
    console.error('Request error:', error);
    return null;
  }
};
