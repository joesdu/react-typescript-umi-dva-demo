import { Effect, Reducer, history } from 'umi';
import { GetAccountAPI, LoginAPI } from '@/services/user';

import avatar from '@/assets/avatar.svg';
import { setAuthority } from '@/utils/authority';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    fetchSetAccount: Effect;
    fetchCurrent: Effect;
    logout: Effect;
    gotoHome: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    cleanCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {}
  },
  effects: {
    *login({ payload, callback }, { call }) {
      const response = yield call(LoginAPI, payload);
      if (!!response && response.code === 1000) {
        localStorage.setItem('userToken', response.result.token);
        localStorage.setItem('date', Date.now().toString());
        if (callback) callback({ state: true, msg: response.msg });
      } else if (callback) callback({ state: false, msg: '请求失败' });
    },
    *fetchSetAccount({ callback }, { call }) {
      const response = yield call(GetAccountAPI);
      if (!!response && response.code === 1000) {
        const { result } = response;
        const { menuList } = result.role;
        let menuName = [];
        for (let index = 0, item; (item = menuList[index++]); ) {
          menuName.push(item.menuName);
        }
        setAuthority(menuName);
        if (callback) callback({ state: true, msg: response.msg });
      } else if (callback) callback({ state: false, msg: '请求失败' });
    },
    *fetchCurrent({ callback }, { call, put }) {
      const response = yield call(GetAccountAPI);
      if (response.code === 1000) {
        const { result } = response;
        yield put({ type: 'saveCurrentUser', payload: { ...result, name: result.name ? result.name : '默认用户名', avatar } });
        if (callback) callback({ state: true, msg: response.msg });
      } else {
        yield put({ type: 'cleanCurrentUser' });
        if (callback) callback({ state: false, msg: '请求失败' });
        history.replace({ pathname: '/login' });
      }
    },
    logout() {
      if (window.location.pathname !== '/login') {
        const itemArray = ['userToken', 'date', 'smart-authority'];
        for (let index = 0, item; (item = itemArray[index++]); ) {
          localStorage.removeItem(item);
        }
        history.replace({ pathname: '/login' });
      }
    },
    gotoHome() {
      history.replace('/');
    }
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return { ...state, currentUser: payload || {} };
    },
    cleanCurrentUser(state) {
      return { ...state, currentUser: {} };
    }
  }
};

export default UserModel;
