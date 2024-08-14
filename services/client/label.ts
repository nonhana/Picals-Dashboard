import type { IGetLabelListRes } from '@/types/api';
import { getHandler } from './methods/GET';

/**
 * @description 分页获取标签列表
 */
export const getLabelListAPI = getHandler<IGetLabelListRes>('/api/label/list');

/**
 * @description 获取标签总数
 */
export const getLabelCountAPI = getHandler<number>('/api/label/count');
