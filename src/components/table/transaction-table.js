import React from 'react';
import { Space, Table } from 'antd';
import CurrencyFormatter from '../../utils/currency-formatter';
const { Column, ColumnGroup } = Table;

const TransactionTableComponent = ({ data }) => (
  <Table bordered dataSource={data} pagination={false} scroll={{ x: 800, y: 250 }}>
    <Column
      title="No"
      render={(text, record, index) => index + 1}
      responsive={['xs', 'sm', 'md', 'lg']}
    />
    <Column
      title="Kode Barang"
      dataIndex="itemId"
      key="itemId"
      render={(value) => {
        return <span>{value ? value.itemCode : 'N/A'}</span>
      }}
      responsive={['sm', 'md', 'lg']}
    />
    <Column
      title="Nama Barang"
      dataIndex="itemId"
      key="itemId"
      render={(value) => {
        return <span>{value ? value.itemName : 'N/A'}</span>
      }}
      responsive={['sm', 'md', 'lg']}
    />
    <Column
      title="Qty"
      dataIndex="quantity"
      key="quantity"
      responsive={['xs', 'sm', 'md', 'lg']}
    />
    <Column
      title="Harga Bandrol"
      dataIndex="price"
      key="price"
      render={(value) => {
        return CurrencyFormatter.format(value);
      }}
      responsive={['md', 'lg']}
    />
    <ColumnGroup title="Diskon" responsive={['md', 'lg']}>
      <Column
        title="%"
        dataIndex="discountPercentage"
        key="discountPercentage"
        render={(value) => {
          return value + '%'
        }}
      />
      <Column
        title="(Rp)"
        dataIndex="discountAmount"
        key="discountAmount"
        render={(value) => {
          return CurrencyFormatter.format(value);
        }}
      />
    </ColumnGroup>
    <Column
      title="Harga Diskon"
      dataIndex="priceAfterDiscount"
      key="priceAfterDiscount"
      render={(value) => {
        return CurrencyFormatter.format(value);
      }}
      responsive={['md', 'lg']}
    />
    <Column
      title="Total"
      dataIndex="grandTotal"
      key="grandTotal"
      render={(value) => {
        return CurrencyFormatter.format(value);
      }}
      responsive={['md', 'lg']}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space className="cursor-pointer" size="middle">
          <span className="text-blue-500">Ubah</span>
          <span className="text-red-500">Hapus</span>
        </Space>
      )}
      responsive={['xs', 'sm', 'md', 'lg']}
    />
  </Table>
);

export default TransactionTableComponent;