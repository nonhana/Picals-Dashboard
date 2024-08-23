import { IGetImageListRes } from '@/types/api';
import { getHandler } from './methods/GET';
import { postHandler } from './methods/POST';

/**
 * @description 分页获取图片列表
 */
export const getImageListAPI = getHandler<IGetImageListRes>('/api/image/list');

/**
 * @description 获取图片总数
 */
export const getImageCountAPI = getHandler<number>('/api/image/count');

/**
 * @description 删除图片
 */
export const deleteImageAPI = postHandler<{ image_id: string }, string>(
  '/api/image/delete'
);
