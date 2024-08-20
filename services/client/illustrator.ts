import type {
  IGetIllustratorDetailRes,
  IGetIllustratorListRes,
  IUploadIllustratorReq,
} from '@/types/api';
import { getHandler } from './methods/GET';
import { postHandler } from './methods/POST';

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

/**
 * @description 获取插画家详情
 */
export const getIllustratorDetailAPI = getHandler<IGetIllustratorDetailRes>(
  '/api/illustrator/detail'
);

/**
 * @description 更新/新增插画家
 */
export const uploadIllustratorAPI = postHandler<IUploadIllustratorReq, string>(
  '/api/illustrator/upload'
);
