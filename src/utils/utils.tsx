import { LoadingOutlined, createFromIconfontCN } from '@ant-design/icons';
import React, { ReactNode } from 'react';

import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';
import { PaginationProps } from 'antd/lib/pagination';
import { Route } from '@/models/connect';
import { pathToRegexp } from 'path-to-regexp';

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends Route>(router: T[] = [], pathname: string): T | undefined => {
  const authority = router.find(({ routes, path = '/' }) => (path && pathToRegexp(path).exec(pathname)) || (routes && getAuthorityFromRouter(routes, pathname)));
  if (authority) return authority;
  return undefined;
};

export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach((route) => {
    // match prefix
    if (pathToRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const getImageInfo = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    // 如果图片被缓存，则直接返回缓存数据
    if (img.complete) resolve(img);
    else {
      img.addEventListener('load', () => {
        resolve(img);
      });
      img.addEventListener('error', (err) => {
        reject(err);
      });
    }
  });

// 统一处理滚轮滚动事件
export const wheel = (event: { wheelDelta: number; detail: number }) => {
  let delta = 0;
  if (event.wheelDelta) {
    // IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
    delta = event.wheelDelta / 120;
    if (window.opera) delta = -delta; // 因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
  } else if (event.detail) delta = -event.detail / 3; // FF浏览器使用的是detail,其值为“正负3”
  return delta;
};

export const userAccount: string | null = localStorage.getItem('phone');

// 统一处理表格表头样式.
export const getTitle = (name: string): ReactNode => <div style={{ fontWeight: 'bold' }}>{name}</div>;

// 统一处理表格分页器
export const getPaginationProps = (pagination: { current: number; total: number; pageSize: number; pageCount: number }, onShowSizeChange: (current: number, size: number) => void, onChange: (page: number, pageSize?: number | undefined) => void): PaginationProps => ({
  style: { padding: '10px 0 0', textAlign: 'center', float: 'none', marginBottom: '10px' },
  current: pagination.current,
  total: pagination.total,
  defaultCurrent: 1,
  pageSize: pagination.pageSize,
  showSizeChanger: true,
  showQuickJumper: true,
  onShowSizeChange,
  onChange,
  showTotal: () => `共 ${pagination.total} 条 第 ${pagination.current} / ${pagination.pageCount} 页`
});

interface IconFontProps extends IconBaseProps {
  type: string;
}
export const IconFont: React.FC<IconFontProps> = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1709014_wl3qyrmbhuo.js'
});

// 获取统一的表格loading对象
export const LoadingObject = (
  loading: boolean
): {
  spinning: boolean;
  indicator: JSX.Element;
} => {
  return {
    spinning: loading,
    indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />
  };
};

/**
 * 获取一个自定义长度的随机字符串,默认16位长度
 */
export const GetKey = (expect: number = 16): string => {
  let str = Math.random().toString(36).substring(2);
  while (str.length < expect) {
    str += Math.random().toString(36).substring(2);
  }
  return str.substring(0, expect);
};
