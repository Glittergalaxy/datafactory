import axios, {
  AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios';
import { message } from 'ant-design-vue';
import { filterEmpty } from './utils';

const instance: AxiosInstance = axios.create({
  timeout: 10000,
});

const errorHandler = async (response: AxiosResponse) => {
  try {
    const { data } = response;
    if (data) {
      if (data.code === 1) {
        message.error(data.message);
      }
    }
    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

instance.interceptors.response.use(errorHandler);

const formHandler = (config: AxiosRequestConfig) => {
  const { data, ...others } = config;
  return instance({
    ...others,
    params: data && filterEmpty(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });
};

const jsonHandler = (config: AxiosRequestConfig) => instance({
  ...config,
  headers: { 'content-type': 'application/json' },
});

const formDataHandler = (config: AxiosRequestConfig) => instance({
  ...config,
  headers: { 'content-type': 'multipart/form-data' },
});

export const FORMAPI = (
  method: AxiosRequestConfig['method'] = 'get',
  url: AxiosRequestConfig['url'],
  data?: object,
) => formHandler({ method, url, data });
export const JSONAPI = (
  method: AxiosRequestConfig['method'] = 'post',
  url: AxiosRequestConfig['url'],
  data?: object,
) => jsonHandler({ method, url, data });
export const FORMDATAAPI = (
  method: AxiosRequestConfig['method'] = 'post',
  url: AxiosRequestConfig['url'],
  data?: object,
) => formDataHandler({ method, url, data });
