import React from 'react';
import { Table } from 'antd';

const CustomersTableComponent = ({ data, columns }) => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    pagination={false}
    scroll={{ x: 'max-content', y: 'h-screen' }}
  />
);

export default CustomersTableComponent;