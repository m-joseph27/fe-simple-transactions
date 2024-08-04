import React from 'react';
import { Table } from 'antd';

const ItemsTableComponent = ({ data, columns }) => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    pagination={false}
    scroll={{ x: 'max-content', y: 'h-screen' }}
  />
);

export default ItemsTableComponent;