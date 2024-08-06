import React, { useEffect, useState } from "react";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import BaseTableComponent from "../../components/table/table";
import { getSales } from "../../services/sales";
import moment from "moment";
import CurrencyFormatter from '../../utils/currency-formatter';
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

const SalesPage = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getSalesFromServer();
  }, []);

  const getSalesFromServer = () => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getSales();
        setSales(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchData();
  }

  const handleClick = () => {
    navigate('/add-transaction');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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
      width: '120px',
      render: (value) => {
        return value.customerId && value.customerId.customerName ? value.customerId.customerName : 'N/A';
      }
    },
    {
      title: 'Jumlah Barang',
      dataIndex: 'transactions',
      width: '100px',
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

  const filteredSales = sales.filter(sale => 
    sale.salesNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (sale.customerId && sale.customerId.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto">
      <div className="flex mb-4 mt-8 gap-4">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button
          type="primary"
          size="middle"
          className="font-semibold text-xs"
          iconPosition="start"
          icon={<PlusOutlined />}
          onClick={handleClick}
        >
          Tambah Transaksi
        </Button>
      </div>
      <BaseTableComponent columns={columns} data={filteredSales} loading={loading} />
    </div>
  )
}

export default SalesPage;