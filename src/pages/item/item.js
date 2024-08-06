import React, { useEffect, useState } from "react";
import { deleteItem, getItems, postItem, updateItem } from "../../services/items";
import { PlusOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Form } from "antd";
import ItemsTableComponent from "../../components/table/item-table";
import CurrencyFormatter from "../../utils/currency-formatter";
import ItemModal from "../../components/modal/item-modal";
import NotificationComponent from "../../components/notification/notification";

const ItemsPage = () => {
  const [itemForm] = Form.useForm();
  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);

  useEffect(() => {
    getItemsFromAPI();
  }, []);

  const getItemsFromAPI = async () => {
    setItemLoading(true);
    try {
      const data = await getItems('');
      setItems(data);
      setItemLoading(false);
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal memuat data barang');
      setItemLoading(false);
    }
  }

  const deleteItemAPI = async (item) => {
    setItemLoading(true);
    try {
      await deleteItem(`/${item._id}`);
      getItemsFromAPI();
      NotificationComponent('success', 'Sukses!', 'Berhasil menghapus barang');
      setItemLoading(false);
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal menghapus barang');
      setItemLoading(false);
    }
  }

  const handleAddOrEditCustomer = () => {
    if (editingItem) {
      editItemAPI();
    } else {
      addItemAPI();
    }
  };

  const addItemAPI = async () => {
    setModalLoading(true);
    const payload = itemForm.getFieldValue();
    try {
      await postItem(payload);
      getItemsFromAPI();
      setIsModalVisible(false);
      itemForm.resetFields();
      NotificationComponent('success', 'Sukses!', 'Berhasil menambahkan barang');
      setModalLoading(false);
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal menambahkan barang');
      modalLoading(false);
    }
  }

  const editItemAPI = async () => {
    setModalLoading(true);
    const payload = itemForm.getFieldValue();
    try {
      await updateItem(editingItem._id, payload);
      getItemsFromAPI();
      setIsModalVisible(false);
      setEditingItem(null);
      itemForm.resetFields();
      NotificationComponent('success', 'Sukses!', 'Berhasil mengupdate barang');
      setModalLoading(false);
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal mengupdate barang');
      setModalLoading(false);
    }
  }

  const openEditModal = (item) => {
    setEditingItem(item);
    itemForm.setFieldsValue(item);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'No',
      align: 'center',
      width: '70px',
      render: (text, record, index) => {
        return index + 1;
      }
    },
    {
      title: 'Kode Barang',
      align: 'center',
      dataIndex: 'itemCode',
    },
    {
      title: 'Nama Barang',
      align: 'center',
      dataIndex: 'itemName',
    },
    {
      title: 'Harga Bandrol',
      align: 'center',
      dataIndex: 'price',
      render: (value) => {
        return CurrencyFormatter.format(value);
      }
    },
    {
      title: 'Aksi',
      align: 'center',
      width: '300px',
      render: (value) => {
        return <div className="flex items-center justify-center gap-4">
          <Button
            className="text-blue-500 bg-blue-300 text-xs font-semibold"
            type="default"
            size="middle"
            onClick={() => openEditModal(value)}
            icon={<EditFilled />}
          >
            Ubah
          </Button>
          <Button
            className="text-red-600 bg-red-300 text-xs font-semibold"
            type="default"
            size="middle"
            onClick={() => deleteItemAPI(value)}
            icon={<DeleteFilled />}
          >
            Delete
          </Button>
        </div>
      }
    }
  ];

  return (
    <div className="container mx-auto">
      <div className="flex mb-4 mt-8">
        <Button
          type="primary"
          size="middle"
          iconPosition="start"
          className="font-semibold text-xs"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsModalVisible(true);
            setEditingItem(null);
          }}
        >
          Tambah Barang
        </Button>
      </div>
      <div>
        <ItemsTableComponent columns={columns} data={items} loading={itemLoading} />
      </div>
      <ItemModal
        visible={isModalVisible}
        onClose={() => {setIsModalVisible(false); itemForm.resetFields()}}
        onSubmit={handleAddOrEditCustomer}
        form={itemForm}
        editingItem={editingItem}
        loading={modalLoading}
      />
    </div>
  )
}

export default ItemsPage;