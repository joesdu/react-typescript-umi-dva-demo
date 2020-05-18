import { ConnectProps, connect, useIntl } from 'umi';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';

import { ConnectState } from '@/models/connect';
import Footer from '@/components/Footer';
import React from 'react';
import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: []
    }
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: ''
    }
  } = props;
  const {} = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
