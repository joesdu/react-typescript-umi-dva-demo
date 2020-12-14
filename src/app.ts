import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  // timeout: 1000,
  errorConfig: {
    adaptor: (resData: any) => {
      return {
        ...resData,
        success: resData.ok, //  resData.ok || resData.code === 1000
        errorMessage: resData.message || resData.msg
      };
    },
    errorPage: '1'
  },
  prefix: `your api baseurl`,
  credentials: 'include',
  middlewares: [],
  requestInterceptors: [
    (url: string, options: any) => {
      localStorage.setItem('date', Date.now().toString());
      const token = localStorage.getItem('userToken');
      options.headers = { Authorization: token ? token : '' };
      return { url, options };
    }
  ],
  responseInterceptors: []
};
