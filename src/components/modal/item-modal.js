import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const ItemModal = ({ visible, onClose, onSubmit, form, editingItem, loading }) => {
  return (
    <Modal
      title={editingItem ? "Edit Barang" : "Tambah Barang"}
      open={visible}
      onCancel={onClose}
      loading={loading}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Batal
        </Button>,
        <Button key="submit" type="primary" onClick={onSubmit}>
          {editingItem ? "Update" : "Tambah"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="itemForm">
        <Form.Item
          name="itemCode"
          label="Kode Barang"
          rules={[{ required: true, message: 'Masukkan kode barang' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="itemName"
          label="Nama Barang"
          rules={[{ required: true, message: 'Masukkan nama barang' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Harga Bandrol"
          rules={[{ required: true, message: 'Masukkan harga bandrol' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ItemModal;