import type { IGetIllustratorListRes } from '@/types/api';
import { getHandler } from './methods/GET';

/**
 * @description 分页获取插画家列表
 */
export const getIllustratorListAPI = getHandler<IGetIllustratorListRes>(
  '/api/illustrator/list'
);

/**
 * @description 获取插画家总数
 */
export const getIllustratorCountAPI = getHandler<number>(
  '/api/illustrator/count'
);
