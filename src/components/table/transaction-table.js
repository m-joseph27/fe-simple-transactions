import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const TransactionTableComponent = () => (
  <Table bordered dataSource={data} pagination={false} >
    <Column title="No" dataIndex="age" key="age" />
    <Column title="Kode Barang" dataIndex="age" key="age" />
    <Column title="Nama Barang" dataIndex="age" key="age" />
    <Column title="Qty" dataIndex="age" key="age" />
    <Column title="Harga Bandrol" dataIndex="age" key="age" />
    <ColumnGroup title="Diskon">
      <Column title="%" dataIndex="age" key="age" />
      <Column title="(Rp)" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Harga Diskon" dataIndex="age" key="age" />
    <Column title="Total" dataIndex="address" key="address" />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space className="cursor-pointer" size="middle">
          <span className="text-blue-500">Ubah</span>
          <span className="text-red-500">Hapus</span>
        </Space>
      )}
    />
  </Table>
);

export default TransactionTableComponent;