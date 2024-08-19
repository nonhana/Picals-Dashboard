import type {
  IGetWorkDetailRes,
  IGetWorkListRes,
  IUploadWorkReq,
} from '@/types/api';
import { getHandler } from './methods/GET';
import { postHandler } from './methods/POST';

/**
 * @description 分页获取作品列表
 */
export const getWorkListAPI = getHandler<IGetWorkListRes>('/api/work/list');

/**
 * @description 获取作品总数
 */
export const getWorkCountAPI = getHandler<number>('/api/work/count');

/**
 * @description 获取作品详情
 */
export const getWorkDetailAPI =
  getHandler<IGetWorkDetailRes>('/api/work/detail');

/**
 * @description 上传/更新作品信息
 */
export const uploadWorkAPI = postHandler<IUploadWorkReq, string>(
  '/api/work/upload'
);
