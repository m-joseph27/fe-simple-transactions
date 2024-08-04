import React from 'react';
import { Table } from 'antd';

const CustomersTableComponent = ({ data, columns, loading }) => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    pagination={false}
    loading={loading}
    scroll={{ x: 'max-content', y: 'h-screen' }}
  />
);

export default CustomersTableComponent;