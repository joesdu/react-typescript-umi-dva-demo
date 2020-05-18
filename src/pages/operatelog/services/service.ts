import { Apis } from '@/configs/apis';
import { request } from 'umi';

/**
 * 获取操作日志
 * @param {Json} params 参数
 */
export const OperateLogAPI = async (params: any): Promise<any> =>
  request(Apis.operatelog.operateList, {
    data: params
  });
