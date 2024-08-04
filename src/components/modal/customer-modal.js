import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CustomerModal = ({ visible, onClose, onSubmit, form, editingCustomer }) => {
  return (
    <Modal
      title={editingCustomer ? "Edit Pelanggan" : "Tambah Pelanggan"}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Batal
        </Button>,
        <Button key="submit" type="primary" onClick={onSubmit}>
          {editingCustomer ? "Update" : "Tambah"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="customerForm">
        <Form.Item
          name="customerCode"
          label="Kode Pelanggan"
          rules={[{ required: true, message: 'Masukkan kode pelanggan' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerName"
          label="Nama Pelanggan"
          rules={[{ required: true, message: 'Masukkan nama pelanggan' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerTelp"
          label="No. Tlp Pelanggan"
          rules={[{ required: true, message: 'Masukkan nomor telepon pelanggan' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerModal;