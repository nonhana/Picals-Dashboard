import type {
  IGetLabelDetailRes,
  IGetLabelListRes,
  IUploadLabelReq,
} from '@/types/api';
import { getHandler } from './methods/GET';
import { postHandler } from './methods/POST';

/**
 * @description 分页获取标签列表
 */
export const getLabelListAPI = getHandler<IGetLabelListRes>('/api/label/list');

/**
 * @description 获取标签总数
 */
export const getLabelCountAPI = getHandler<number>('/api/label/count');

/**
 * @description 获取标签详情
 */
export const getLabelDetailAPI =
  getHandler<IGetLabelDetailRes>('/api/label/detail');

/**
 * @description 更新/新增标签
 */
export const uploadLabelAPI = postHandler<IUploadLabelReq, null>(
  '/api/label/upload'
);
