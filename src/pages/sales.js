import React, { useEffect, useState } from "react";
import BaseTableComponent from "../components/table/table";
import { getSales } from "../services/sales";
import moment from "moment";
import CurrencyFormatter from '../utils/currency-formatter';

const SalesPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSalesFromServer();
  }, []);

  const getSalesFromServer = () => {
    const fetchData = async () => {
      try {
        const data = await getSales();
        setSales(data);
      } catch (error) {
      }
    }

    fetchData();
  }

  const columns = [
    {
      title: 'No Transaksi',
      dataIndex: 'salesNumber',
    },
    {
      title: 'Tanggal',
      dataIndex: 'salesDate',
      render: (value) => {
        return moment(value).format('DD-MM-YYYY');
      }
    },
    {
      title: 'Nama Customer',
      render: (value) => {
        return value.customerId.customerName;
      }
    },
    {
      title: 'Jumlah Barang',
      dataIndex: 'transactions',
      render: (value) => {
        return value.length;
      }
    },
    {
      title: 'Sub Total',
      dataIndex: 'subTotal',
      render: (value) => {
        return CurrencyFormatter.format(value);
      }
    },
    {
      title: 'Diskon',
      dataIndex: 'discount',
      render: (value) => {
        return CurrencyFormatter.format(value);
      }
    },
    {
      title: 'Ongkir',
      dataIndex: 'shippingCost',
      render: (value) => {
        return CurrencyFormatter.format(value);
      }
    },
    {
      title: 'Total',
      dataIndex: 'grandTotal',
      render: (value) => {
        return CurrencyFormatter.format(value);
      }
    },
  ];

  return (
    <div>
      <BaseTableComponent columns={columns} data={sales} />
    </div>
  )
}

export default SalesPage;