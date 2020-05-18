import { Card, Table, Tag } from 'antd';
import { ConnectProps, Dispatch, Loading, OperateLogModelState, connect } from 'umi';
import { LoadingObject, getPaginationProps, getTitle, userAccount } from '@/utils/utils';
import React, { Component } from 'react';

import { ColumnProps } from 'antd/lib/table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const colors: Array<string> = ['cyan', 'blue', 'red', 'lime', 'purple'];
const texts: Array<string> = ['新增', '修改', '删除', '查询', '登陆'];
interface OperateLogProps extends Partial<ConnectProps> {
  operatelog: OperateLogModelState;
  loading: boolean;
  dispatch: Dispatch;
}
class OperateLog extends Component<OperateLogProps> {
  private column: ColumnProps<any>[] = [
    { title: getTitle('账号'), dataIndex: 'phone', key: 'phone', align: 'center' },
    { title: getTitle('模块名'), dataIndex: 'operationModule', key: 'operationModule', align: 'center' },
    { title: getTitle('操作名'), dataIndex: 'operationName', key: 'operationName', align: 'center' },
    { title: getTitle('请求耗时'), dataIndex: 'costTime', key: 'costTime', align: 'center', render: (text: string) => `${text}ms` },
    { title: getTitle('请求IP'), dataIndex: 'requestIp', key: 'requestIp', align: 'center' },
    {
      title: getTitle('操作类型'),
      dataIndex: 'operationType',
      key: 'operationType',
      align: 'center',
      render: (text: number) => <Tag color={colors[text - 1]}>{texts[text - 1]}</Tag>
    },
    {
      title: getTitle('操作结果'),
      dataIndex: 'resultCode',
      key: 'resultCode',
      align: 'center',
      render: (text: number) => (text === 1000 ? <Tag color="green">成功</Tag> : <Tag color="orange">失败</Tag>)
    }
  ];

  constructor(props: Readonly<OperateLogProps>) {
    super(props);
  }

  componentDidMount() {
    const {
      operatelog: { pagination }
    } = this.props;
    this.fetchOperateLog(pagination.current, pagination.pageSize);
  }

  private fetchOperateLog = (pageIndex: number, pageSize: number) => {
    const { dispatch } = this.props;
    dispatch({ type: 'operatelog/fetchOperateLog', payload: { phone: userAccount, pageIndex, pageSize } });
  };

  render() {
    const {
      operatelog: { pagination, logList },
      loading
    } = this.props;
    const paginationProps = getPaginationProps(
      pagination,
      (current: number, pageSize: number) => this.fetchOperateLog(current, pageSize),
      (page: number, pageSize?: number) => this.fetchOperateLog(page, pageSize!)
    );

    return (
      <PageHeaderWrapper>
        <Card bordered={false} title="用户操作日志">
          <Table loading={LoadingObject(loading)} rowKey={(record) => record.id} tableLayout="fixed" size="small" bordered={false} dataSource={logList} columns={this.column} pagination={paginationProps} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ operatelog, loading }: { operatelog: OperateLogModelState; loading: Loading }) => ({
  operatelog,
  loading: loading.models.operatelog
}))(OperateLog);
