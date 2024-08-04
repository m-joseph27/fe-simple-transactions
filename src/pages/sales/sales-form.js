import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TransactionTableComponent from '../../components/table/transaction-table';
import { getTransactions, postTransaction } from '../../services/transactions';
import { getCustomers } from '../../services/customer';
import moment from 'moment';
import { postSale } from '../../services/sales';
import TransactionModal from '../../components/modal/modal';
import { getItems } from '../../services/items';

const { Option } = Select;

const generateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const randomDigits = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `${year}${month}-${randomDigits}`;
};

const SalesFormComponent = () => {
  const salesNumber = generateString();
  const [form] = Form.useForm();
  const [itemForm] = Form.useForm();
  const [items, setItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    form.setFieldsValue({ salesNumber: salesNumber });
    getItemsFromAPI();
    getCustomersFromAPI();
    getTransactionsFromAPI();
  }, [form]);

  const getTransactionsFromAPI = async () => {
    try {
      const data = await getTransactions('');
      setTransactions(data);
    } catch (error) {
      alert('Gagal memuat data');
    }
  };

  const getCustomersFromAPI = async () => {
    try {
      const data = await getCustomers('');
      setCustomers(data);
    } catch (error) {
      alert('Gagal memuat data');
    }
  };

  const getItemsFromAPI = async () => {
    try {
      const data = await getItems('');
      setItems(data);
      console.log('barang', data);
    } catch (error) {
      alert('gagal memuat barang');
    }
  }

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
    const formValue = form.getFieldValue();
    const payload = {
      salesNumber: formValue.salesNumber,
      salesDate: formValue.salesDate,
      discount: Number(formValue.discount),
      shippingCost: Number(formValue.shippingCost),
      customerId: formValue.customerId,
      transactions: ['66ab3295f2987073faf82a7e', '66ab342ae0eb9473f184f210']
    }

    try {
      await postSale('', payload);
    } catch (error) {
      alert('gagal membuat sales');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingItem(null);
  };

  const handleCreate = () => {
    itemForm.validateFields().then(values => {
      console.log('values', values);
      const payload = {
        itemId: values.itemId,
        quantity: values,
        discountPercentage: values.discountPercentage
      }
      setIsModalVisible(false);

      if (editingItem) {
        const newItems = items.map(item => item.key === editingItem.key ? { ...item, ...values } : item);
        setItems(newItems);
      } else {
        const newItem = { ...values, key: Date.now() };
        setItems([...items, newItem]);
      }

      try {
        postTransaction('', payload);
        getTransactionsFromAPI();
      } catch (error) {
        alert('gagal membuat transaksi')
      }
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    itemForm.resetFields();
  };

  return (
    <div className="container mx-auto mt-6">
      <div className="border bg-white rounded-lg p-4">
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
            <div>
              <Button className="mt-6" size="middle" type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                Tambah Barang
              </Button>
            </div>
            <div className="mt-6 mb-10">
              <TransactionTableComponent data={transactions} />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <div className="bg-white w-80 rounded-lg px-8 py-8">
              <p className="mb-4 text-sm text-blue-500 font-semibold">Total Tagihan</p>
              <Form.Item label="Sub Total" name="subtotal">
                <Input
                  disabled
                  type="number"
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
                  disabled
                  type="number"
                  readOnly
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-center items-center gap-10 w-full px-8 py-8 bg-white mt-20 rounded-lg">
            <Button type="primary" htmlType="submit" className="font-semibold w-40 h-10">Simpan</Button>
            <Button type="default" className="font-semibold w-40 h-10">Batal</Button>
          </div>
        </Form>
      </div>
      <TransactionModal
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={handleCancel}
        form={itemForm}
        editingItem={editingItem}
        items={items}
      />
    </div>
  );
};

export default SalesFormComponent;