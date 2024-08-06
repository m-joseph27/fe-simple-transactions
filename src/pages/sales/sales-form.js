import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getCustomers } from '../../services/customer';
import moment from 'moment';
import TransactionTableComponent from './sales-table';
import { postSale } from '../../services/sales';
import { useNavigate } from 'react-router-dom';
import NotificationComponent from '../../components/notification/notification';

const { Option } = Select;

const generateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const randomDigits = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `${year}${month}-${randomDigits}`;
};

const SalesFormComponent = () => {
  const navigate = useNavigate();
  const salesNumber = generateString();
  const [form] = Form.useForm();
  const [transactionForm] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const transactions = localStorage.getItem('transactions');
  const items = JSON.parse(transactions);
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    form.setFieldsValue({ salesNumber: salesNumber });
    getCustomersFromAPI();
  }, [form]);

  useEffect(() => {
    if (items && items.length > 0) {
      const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
      setSubtotal(total);
      form.setFieldsValue({ subtotal: total });
    }
  }, transactionForm);



  const getCustomersFromAPI = async () => {
    try {
      const data = await getCustomers('');
      setCustomers(data);
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal memuat data pelanggan');
    }
  };

  const handleCustomerChange = (value, option) => {
    const customer = customers.find(cust => cust.customerCode === value);
    setSelectedCustomer(customer);
    form.setFieldsValue({
      customerId: option.key,
      customerName: customer ? customer.customerName : '',
      customerTelp: customer ? customer.customerTelp : '',
    });
  };

  const handleDateChange = (date, dateString) => {
    const dateFormat = moment(dateString).format('YYYY-DD-MM');
    form.setFieldsValue({ salesDate: dateFormat });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formValue = form.getFieldValue();
    const payload = {
      salesNumber: formValue.salesNumber,
      salesDate: formValue.salesDate,
      discount: Number(formValue.discount),
      shippingCost: Number(formValue.shippingCost),
      customerId: formValue.customerId,
      transactions: items && items.map(item => item._id)
    }
    try {
      await postSale('', payload);
      localStorage.removeItem('transactions');
      setLoading(false);
      NotificationComponent('success', 'Sukses!', 'Berhasil menambah data sales');
      navigate('/');
    } catch (error) {
      setLoading(false);
      NotificationComponent('error', 'Error!', 'Gagal menambah data sales');
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <div className="border bg-white rounded-lg p-4">
        {
          loading ? (
            <div className="flex items-center justify-center h-screen">
              <Spin size="large" indicator={<LoadingOutlined />} spin />
            </div>
          ) : (
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
            >
              <div className="mb-4 text-sm">
                <h2 className="text-lg font-semibold mb-2">Transaksi</h2>
                <Form.Item label="No" name="salesNumber">
                  <Input className="w-1/2" disabled />
                </Form.Item>
                <Form.Item label="Tanggal" name="tanggal">
                  <DatePicker
                    className="w-1/2"
                    onChange={handleDateChange}
                    format={'DD/MM/YYYY'}
                  />
                </Form.Item>
              </div>
              <hr className="mb-4 mt-6" />
              <div className="mb-4 text-sm">
                <h2 className="text-lg font-semibold mb-2">Customer</h2>
                <Form.Item required className="w-1/2" label="Kode Customer" name="customerCode">
                  <Select onChange={handleCustomerChange}>
                    {customers.map((customer) => (
                      <Option key={customer._id} value={customer.customerCode}>
                        {customer.customerCode}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Nama Customer" name="customerName">
                  <Input className="w-1/2" disabled />
                </Form.Item>
                <Form.Item label="Telp" name="customerTelp">
                  <Input className="w-1/2" disabled />
                </Form.Item>
                <hr className="mt-6" />
                <div className="mt-6 mb-10">
                  <TransactionTableComponent form={transactionForm} />
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <div className="bg-white w-80 rounded-lg px-8 py-8 shadow-md">
                  <p className="mb-4 text-sm text-blue-500 font-semibold">Total Tagihan</p>
                  <Form.Item label="Sub Total" name="subtotal">
                    <Input
                      disabled
                      type="number"
                      value={subtotal}
                    />
                  </Form.Item>
                  <Form.Item label="Diskon" name="discount">
                    <Input
                      type="number"
                    />
                  </Form.Item>
                  <Form.Item label="Ongkir" name="shippingCost">
                    <Input
                      type="number"
                    />
                  </Form.Item>
                  <Form.Item label="Total Bayar" name="total">
                    <Input
                      type="number"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-center items-center gap-10 w-full px-8 py-8 bg-white mt-20 rounded-lg">
                <Button type="primary" htmlType="submit" className="font-semibold w-40 h-10">Simpan</Button>
                <Button type="default" className="font-semibold w-40 h-10">Batal</Button>
              </div>
            </Form>
          )
        }
      </div>
    </div>
  );
};

export default SalesFormComponent;