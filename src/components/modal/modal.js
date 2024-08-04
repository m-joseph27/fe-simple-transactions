import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

const TransactionModal = ({ visible, onCreate, onCancel, editingItem, items, form }) => {
  const handleItemCodeChange = (value) => {
    const item = items.find((item) => item.itemCode === value);
    form.setFieldsValue({
      itemName: item ? item.itemName : '',
      itemId: item ? item._id : ''
    });
  };

  return (
    <Modal
      title={editingItem ? "Edit Barang" : "Tambah Barang"}
      open={visible}
      onOk={onCreate}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="itemId" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="itemCode" label="Kode Barang" rules={[{ required: true, message: 'Kode Barang harus diisi' }]}>
          <Select onChange={handleItemCodeChange}>
            {items.map((item) => (
              <Option key={item._id} value={item.itemCode}>
                {item.itemCode}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="itemName" label="Nama Barang" rules={[{ required: true, message: 'Nama Barang harus diisi' }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="quantity" label="Qty" rules={[{ required: true, message: 'Quantity harus diisi' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="discountPercentage" label="Diskon (%)">
          <InputNumber min={0} max={100} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionModal;