import { IGetImageListRes } from '@/types/api';
import { getHandler } from './methods/GET';

export const getImageListAPI = getHandler<IGetImageListRes>('/api/image/list');

export const getImageCountAPI = getHandler<number>('/api/image/count');
