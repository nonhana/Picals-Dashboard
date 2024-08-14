import type { IGetWorkListRes } from '@/types/api';
import { getHandler } from './methods/GET';

/**
 * @description 分页获取作品列表
 */
export const getWorkListAPI = getHandler<IGetWorkListRes>('/api/work/list');

/**
 * @description 获取作品总数
 */
export const getWorkCountAPI = getHandler<number>('/api/work/count');
