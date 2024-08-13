import type { IGetCommentListRes } from '@/types/api';
import http from '..';

/**
 * @description 分页获取评论列表
 */
export const getCommentListAPI = async (
  data: Record<string, string>
): Promise<IGetCommentListRes | null> => {
  try {
    const query = new URLSearchParams(
      data as Record<string, string>
    ).toString();
    const res = await http<IGetCommentListRes>(`/api/comment/list?${query}`);
    if (res.code === 200) {
      return res.data || null;
    } else {
      console.error('Failed to fetch comment list:', res.message);
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
export const getCommentCountAPI = async (
  data: Record<string, string>
): Promise<number | null> => {
  try {
    const query = new URLSearchParams(
      data as Record<string, string>
    ).toString();
    const res = await http<number>(`/api/comment/count?${query}`);
    if (res.code === 200) {
      return res.data || null;
    } else {
      console.error('Failed to fetch comment count:', res.message);
      return null;
    }
  } catch (error) {
    console.error('Request error:', error);
    return null;
  }
};
