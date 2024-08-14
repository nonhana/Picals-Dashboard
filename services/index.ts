import type { BaseRes } from '@/types/api';
import toast from '@/ui/Toast';
import { getApiUrl } from '@/utils/helpers';
import { getCookie } from './cookie';

interface RequestOptions extends RequestInit {
  responseType?:
    | 'TEXT'
    | 'JSON'
    | 'BLOB'
    | 'ARRAYBUFFER'
    | 'text'
    | 'json'
    | 'blob'
    | 'arraybuffer';
  body?: any;
}

const http = async <T>(
  url: string,
  config?: RequestOptions
): Promise<BaseRes<T>> => {
  const finalUrl = getApiUrl(url);

  const initialConfig: RequestOptions = {
    method: 'GET',
    body: null,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token') ? 'Bearer ' + getCookie('token') : '',
    },
    credentials: 'include',
    cache: 'no-cache',
    mode: 'cors',
    responseType: 'JSON',
  };

  const configs: RequestOptions = {
    ...initialConfig,
    ...config,
  };
  if (config && config.headers)
    configs.headers = {
      ...initialConfig.headers,
      Authorization: getCookie('token') ? 'Bearer ' + getCookie('token') : '',
      ...config.headers,
    };

  const finalConfig: RequestInit = {
    method: configs.method?.toUpperCase(),
    credentials: configs.credentials,
    mode: configs.mode,
    cache: configs.cache,
    headers: configs.headers,
    body: configs.body,
  };

  console.log('fetch 的配置：', finalUrl, finalConfig);

  return fetch(`${finalUrl}`, finalConfig)
    .then(async (response: Response) => {
      const { status } = response;

      if (status >= 200 && status < 400) {
        let result: T;

        switch (configs.responseType && configs.responseType.toUpperCase()) {
          case 'TEXT':
            result = (await response.text()) as unknown as T;
            break;
          case 'JSON':
            result = (await response.json()) as T;
            break;
          case 'BLOB':
            result = (await response.blob()) as unknown as T;
            break;
          case 'ARRAYBUFFER':
            result = (await response.arrayBuffer()) as unknown as T;
            break;
          default:
            result = (await response.json()) as T;
        }
        return {
          code: status,
          message: 'success',
          data: result,
        };
      }
      // 失败的处理
      return Promise.reject({
        status,
        message: response.statusText,
      });
    })
    .catch((reason: any) => {
      // @2:断网
      if (typeof window !== 'undefined' && navigator && !navigator.onLine) {
        toast.error('Your network is break!', { id: 'status_network' });
      }
      // @1:状态码失败
      if (reason && reason.status) {
        switch (reason.status) {
          case 400:
            toast.error('Please verify your info!', { id: 'status400' });
            break;
          case 401:
            toast.error('Please Login!', { id: 'status401' });
            break;
          case 403:
            toast.error('You have no access to this', { id: 'status403' });
            break;
          case 500:
            toast.error("Oops, there's something wrong!", { id: 'status500' });
            break;
          case 504:
            toast.error("Oops, there's something wrong!", { id: 'status504' });
            break;
          default:
        }
      } else {
        // @3:处理返回数据格式失败
        toast.error("Oops, there's something wrong!", { id: 'status500' });
      }

      return Promise.reject({
        code: reason.status,
        message: reason.message ?? 'Unknown Error',
      });
    });
};

export default http;
