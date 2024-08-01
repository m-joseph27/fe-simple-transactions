import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'No Transaksi',
    dataIndex: 'transactionNumber',
  },
  {
    title: 'Tanggal',
    dataIndex: 'date'
  },
  {
    title: 'Nama Customer',
    dataIndex: 'customerName',
  },
  {
    title: 'Jumlah Barang',
    dataIndex: 'subItems',
  },
  {
    title: 'Sub Total',
    dataIndex: 'subTotal',
  },
  {
    title: 'Diskon',
    dataIndex: 'discount',
  },
  {
    title: 'Ongkir',
    dataIndex: 'shippingCharge',
  },
  {
    title: 'Total',
    dataIndex: 'grandTotal',
  },
];

const data = [
  {
    transactionNumber: '111',
    date: '31-07-2024',
    customerName: 'John Doe',
    subItems: 2,
    subTotal: "250,000",
    discount: "5,000",
    shippingCharge: "15,000",
    grandTotal: "255,000"
  },
  {
    transactionNumber: '112',
    date: '31-07-2024',
    customerName: 'Johnny White',
    subItems: 2,
    subTotal: "300,000",
    discount: "15,000",
    shippingCharge: "15,000",
    grandTotal: "300,000"
  },
];

const BaseTableComponent = () => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    footer={() => <div className="text-lg flex justify-end items-end pr-4">
        <p>Grand Total</p>
      </div>
    }
    pagination={false}
    scroll={{ x: 'max-content' }}
  />
);

export default BaseTableComponent;