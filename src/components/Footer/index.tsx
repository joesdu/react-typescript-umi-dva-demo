import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';

// import { GithubOutlined } from '@ant-design/icons';

export default () => (
  <DefaultFooter
    copyright="Winside.com, 2019-2020 All Rights Reserved."
    links={[
      // {
      //   key: 'Ant Design Pro',
      //   title: 'Ant Design Pro',
      //   href: 'https://pro.ant.design',
      //   blankTarget: true
      // },
      // {
      //   key: 'github',
      //   title: <GithubOutlined />,
      //   href: 'https://github.com/ant-design/ant-design-pro',
      //   blankTarget: true
      // },
      // {
      //   key: 'Ant Design',
      //   title: 'Ant Design',
      //   href: 'https://ant.design',
      //   blankTarget: true
      // }
      {
        key: 'help',
        title: '帮助',
        blankTarget: true,
        href: ''
      },
      {
        key: 'privacy',
        title: '隐私',
        blankTarget: true,
        href: ''
      },
      {
        key: 'provisions',
        title: '条款',
        blankTarget: true,
        href: ''
      }
    ]}
  />
);
