import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'antd';
import { PlusOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import CurrencyFormatter from '../../utils/currency-formatter';
import { deleteTransactions, postTransactions, updateTransactions } from '../../services/transactions';
import TransactionModal from '../../components/modal/modal';
import { getItems } from '../../services/items';
import NotificationComponent from '../../components/notification/notification';

const { Column, ColumnGroup } = Table;

const TransactionTableComponent = () => {
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [createItem, setCreateItem] = useState(() => {
    const savedItems = localStorage.getItem('transactions');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    getItemsFromAPI();
  }, []);


  const deleteTransactionAPI = async (transaction) => {
    try {
      await deleteTransactions(`/${transaction._id}`);
      setCreateItem(prevItems => {
        const newItems = prevItems.filter(item => item._id !== transaction._id);
        localStorage.setItem('transactions', JSON.stringify(newItems));
        return newItems;
      });
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal menghapus transaksi');
    }
  };

  const getItemsFromAPI = async () => {
    try {
      const data = await getItems('');
      setItems(data);
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal memuat data barang');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = async () => {
    setModalLoading(true);
    try {
      const values = await form.validateFields();
      const payload = {
        itemId: values.itemId,
        quantity: values.quantity,
        discountPercentage: values.discountPercentage
      };
      setIsModalVisible(false);

      if (editingItem) {
        await updateTransactions(editingItem._id, payload);
        setCreateItem(prevItems => {
          const newItems = prevItems.map(item =>
            item._id === editingItem._id ? { ...item, ...values } : item
          );
          localStorage.setItem('transactions', JSON.stringify(newItems));
          return newItems;
        });
      } else {
        const response = await postTransactions(payload);
        setCreateItem(prevItems => {
          const newItems = [...prevItems, response];
          localStorage.setItem('transactions', JSON.stringify(newItems));
          return newItems;
        });
      }

      setModalLoading(false);
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal menambahkan transaksi');
      setModalLoading(false);
    }
  };

  return (
    <>
      <div>
        <div>
          <Button className="mb-4" size="middle" type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Tambah Barang
          </Button>
        </div>
        <Table
          bordered
          dataSource={createItem}
          pagination={false}
          scroll={{ x: 800, y: 250 }}
          className="shadow-md"
        >
          <Column
            title="No"
            width={70}
            render={(text, record, index) => index + 1}
            responsive={['xs', 'sm', 'md', 'lg']}
          />
          <Column
            title="Kode Barang"
            dataIndex="itemCode"
            key="itemCode"
            render={(value) => <span>{value ? value : 'N/A'}</span>}
            responsive={['sm', 'md', 'lg']}
          />
          <Column
            title="Nama Barang"
            dataIndex="itemName"
            key="itemName"
            render={(value) => <span>{value ? value : 'N/A'}</span>}
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
            render={(value) => CurrencyFormatter.format(value)}
            responsive={['md', 'lg']}
          />
          <ColumnGroup title="Diskon" responsive={['md', 'lg']}>
            <Column
              title="%"
              dataIndex="discountPercentage"
              key="discountPercentage"
              render={(value) => value + '%'}
            />
            <Column
              title="(Rp)"
              dataIndex="discountAmount"
              key="discountAmount"
              render={(value) => CurrencyFormatter.format(value)}
            />
          </ColumnGroup>
          <Column
            title="Harga Diskon"
            dataIndex="priceAfterDiscount"
            key="priceAfterDiscount"
            render={(value) => CurrencyFormatter.format(value)}
            responsive={['md', 'lg']}
          />
          <Column
            title="Total"
            dataIndex="grandTotal"
            key="grandTotal"
            render={(value) => CurrencyFormatter.format(value)}
            responsive={['md', 'lg']}
          />
          <Column
            title="Action"
            key="action"
            width={250}
            align="center"
            render={(_, record) => (
              <div className="flex items-center justify-center gap-4">
                <Button
                  className="text-blue-500 bg-blue-300 text-xs font-semibold"
                  type="default"
                  size="middle"
                  icon={<EditFilled />}
                >
                  Ubah
                </Button>
                <Button
                  className="text-red-600 bg-red-300 text-xs font-semibold"
                  type="default"
                  size="middle"
                  icon={<DeleteFilled />}
                  onClick={() => deleteTransactionAPI(record)}
                >
                  Delete
                </Button>
              </div>
            )}
            responsive={['xs', 'sm', 'md', 'lg']}
          />
        </Table>
      </div>
      <TransactionModal
        key="transaction-modal"
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={handleCancel}
        form={form}
        editingItem={editingItem}
        items={items}
        loading={modalLoading}
      />
    </>
  );
};

export default TransactionTableComponent;