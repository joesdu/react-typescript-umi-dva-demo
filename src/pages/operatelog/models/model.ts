import { Effect, Reducer } from 'umi';

import { OperateLogAPI } from '../services/service';

export interface OperateLogModelState {
  logList: Array<any>;
  pagination: { total: number; pageSize: number; current: number; pageCount: number };
}
interface OperateLogModelType {
  namespace: 'operatelog';
  state: OperateLogModelState;
  effects: {
    fetchOperateLog: Effect;
  };
  reducers: {
    saveLogList: Reducer<OperateLogModelState>;
    clean: Reducer<OperateLogModelState>;
  };
}
const OperateLogModel: OperateLogModelType = {
  namespace: 'operatelog',
  state: {
    logList: [],
    pagination: { total: 0, pageSize: 10, current: 1, pageCount: 0 }
  },
  effects: {
    *fetchOperateLog({ payload, callback }, { call, put }) {
      const response = yield call(OperateLogAPI, payload);
      if (!!response && response.code === 1000) {
        yield put({
          type: 'saveLogList',
          payload: response.result.list,
          page: { total: response.result.page.tcount, pageSize: response.result.page.psize, current: response.result.page.cpage, pageCount: response.result.page.tpages }
        });
        if (callback) callback({ state: true, msg: response.msg });
      } else {
        yield put({ type: 'clean' });
        if (callback) callback({ state: false, msg: '请求失败' });
      }
    }
  },
  reducers: {
    saveLogList(state, { payload, page }) {
      return { ...state, logList: payload, pagination: page };
    },
    clean(state) {
      return { ...state, logList: [], pagination: { total: 0, pageSize: 10, current: 1, pageCount: 0 } };
    }
  }
};
export default OperateLogModel;
