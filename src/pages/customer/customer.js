import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import CustomersTableComponent from "../../components/table/customer-table";
import { deleteCustomer, getCustomers, postCustomer, updateCustomer } from "../../services/customer";
import { Button, Form } from "antd";
import CustomerModal from "../../components/modal/customer-modal";
import NotificationComponent from "../../components/notification/notification";

const CustomerPage = () => {
  const [customerForm] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);

  useEffect(() => {
    getCustomersFromAPI();
  }, []);

  const getCustomersFromAPI = async () => {
    setCustomerLoading(true);
    try {
      const data = await getCustomers('');
      setCustomers(data);
      setCustomerLoading(false);
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Terjadi Kesalahan saat memuat pelanggan');
      setCustomerLoading(false);
    }
  }

  const deleteCustomerAPI = async (customer) => {
    try {
      await deleteCustomer(`/${customer._id}`);
      NotificationComponent('success', 'Sukses!', 'Berhasil menghapus pelanggan');
      getCustomersFromAPI();
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal menghapus pelanggan');
    }
  }

  const handleAddOrEditCustomer = () => {
    if (editingCustomer) {
      editCustomerAPI();
    } else {
      addCustomerAPI();
    }
  };

  const addCustomerAPI = async () => {
    setLoading(true);
    const payload = customerForm.getFieldValue();
    try {
      await postCustomer(payload);
      getCustomersFromAPI();
      setIsModalVisible(false);
      setLoading(false);
      customerForm.resetFields();
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal menambahkan pelanggan periksa kembali data yang diinput');
      setLoading(false);
    }
  };

  const editCustomerAPI = async () => {
    setLoading(true);
    const payload = await customerForm.getFieldValue();
    try {
      await updateCustomer(editingCustomer._id, payload);
      getCustomersFromAPI();
      setIsModalVisible(false);
      customerForm.resetFields();
      setEditingCustomer(null);
      setLoading(false);
    } catch (error) {
      NotificationComponent('error', 'Error!', 'Gagal mengupdate pelanggan periksa kembali data yang diinput');
      setLoading(false);
    }
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    customerForm.setFieldsValue(customer);
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
      title: 'Kode Pelanggan',
      align: 'center',
      dataIndex: 'customerCode',
    },
    {
      title: 'Nama Pelanggan',
      align: 'center',
      dataIndex: 'customerName',
    },
    {
      title: 'No. Tlp Pelanggan',
      align: 'center',
      dataIndex: 'customerTelp',
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
            onClick={() => deleteCustomerAPI(value)}
            icon={<DeleteFilled />}
          >
            Delete
          </Button>
        </div>
      }
    }
  ]

  return (
    <div className="container mx-auto">
      <div className="mb-4 mt-8">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          iconPosition="start"
          className="font-semibold text-xs"
          onClick={() => {
            setIsModalVisible(true);
            setEditingCustomer(null);
          }}
        >
          Tambah Pelanggan
        </Button>
      </div>
      <div>
        <CustomersTableComponent columns={columns} data={customers} loading={customerLoading} />
      </div>
      <CustomerModal
        visible={isModalVisible}
        onClose={() => {setIsModalVisible(false); customerForm.resetFields()}}
        onSubmit={handleAddOrEditCustomer}
        form={customerForm}
        editingCustomer={editingCustomer}
        loading={loading}
      />
    </div>
  )
}

export default CustomerPage;