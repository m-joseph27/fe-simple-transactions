import React from 'react';
import { Space, Table } from 'antd';
import CurrencyFormatter from '../../utils/currency-formatter';
const { Column, ColumnGroup } = Table;

const TransactionTableComponent = ({ data }) => (
  <Table bordered dataSource={data} pagination={false} >
    <Column
      title="No"
      render={(text, record, index) => index + 1}
    />
    <Column
      title="Kode Barang"
      dataIndex="itemId"
      key="itemId"
      render={(value) => {
        return <span>{value.itemCode}</span>
      }}
    />
    <Column
      title="Nama Barang"
      dataIndex="itemId"
      key="itemId"
      render={(value) => {
        return <span>{value.itemName}</span>
      }}
    />
    <Column
      title="Qty"
      dataIndex="quantity"
      key="quantity"
    />
    <Column
      title="Harga Bandrol"
      dataIndex="price"
      key="price"
      render={(value) => {
        return CurrencyFormatter.format(value);
      }}
    />
    <ColumnGroup title="Diskon">
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
    />
    <Column
      title="Total"
      dataIndex="grandTotal"
      key="grandTotal"
      render={(value) => {
        return CurrencyFormatter.format(value);
      }}
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
    />
  </Table>
);

export default TransactionTableComponent;