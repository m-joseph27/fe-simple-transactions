import React, { useState } from 'react';
import customers from '../../pages/data';
import BaseTableComponent from '../table/table';
import { Button } from 'antd';

const FormComponent = () => {
  const [transaksi, setTransaksi] = useState({ no: '', tanggal: '' });
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customerData, setCustomerData] = useState({ nama: '', telp: '' });

  const [customer, setCustomer] = useState({ kode: '', nama: '', telp: '' });
  const [formData, setFormData] = useState({
    no: '',
    tanggal: '',
    subtotal: 0,
    diskon: 0,
    ongkir: 0,
    total: 0
  });

  const handleCustomerChange = (e) => {
    const selectedCustomer = customers.find(c => c.kode === e.target.value);
    setCustomer(selectedCustomer);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      total: calculateTotal({ ...formData, [name]: value })
    });
  };

  const calculateTotal = ({ subtotal, diskon, ongkir }) => {
    return Number(subtotal) - Number(diskon) + Number(ongkir);
  };

  return (
    <div className="container mx-auto mt-6">
      <div className="border bg-white rounded-lg p-4">
        <div className="mb-4 text-sm">
          <h2 className="text-lg font-semibold mb-2">Transaksi</h2>
          <div className="mb-2">
            <label className="block text-gray-700">No</label>
            <input
              type="text"
              value={transaksi.no}
              onChange={(e) => setTransaksi({ ...transaksi, no: e.target.value })}
              className="mt-1 block w-1/2 p-2 border rounded-md" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Tanggal</label>
            <input
              type="date"
              value={transaksi.tanggal}
              onChange={(e) => setTransaksi({ ...transaksi, tanggal: e.target.value })}
              className="mt-1 block w-1/2 p-2 border rounded-md" />
          </div>
        </div>
        <hr className="mb-4 mt-6" />
        <div className="mb-4 text-sm">
          <h2 className="text-lg font-semibold mb-2">Customer</h2>
          <div className="mb-2">
            <label className="block text-gray-700">Kode Customer</label>
            <select
              value={selectedCustomer}
              onChange={handleCustomerChange}
              className="mt-1 block w-1/2 p-2 border rounded-md"
            >
              <option value="">Pilih Kode Customer</option>
              {customers.map((customer) => (
                <option key={customer.kode} value={customer.kode}>
                  {customer.kode}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Nama Customer</label>
            <input
              type="text"
              value={customerData.nama}
              readOnly
              className="mt-1 block w-1/2 p-2 border rounded-md bg-gray-100" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Telp</label>
            <input
              type="text"
              value={customerData.telp}
              readOnly
              className="mt-1 block w-1/2 p-2 border rounded-md bg-gray-100" />
          </div>
          <hr className="mt-6" />
          <div className="mt-10 mb-10">
            <BaseTableComponent />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <div className="bg-white w-80 rounded-lg px-8 py-8">
          <p className="mb-4 text-sm text-blue-500 font-semibold">Total Tagihan</p>
          <div className="flex mb-4 items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">Sub Total</label>
            <input
              disabled
              type="number"
              name="subtotal"
              value={formData.subtotal}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="flex mb-4 items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">Diskon</label>
            <input
              type="number"
              name="diskon"
              value={formData.diskon}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="flex mb-4 items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">Ongkir</label>
            <input
              type="number"
              name="ongkir"
              value={formData.ongkir}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="flex mb-4 items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">Total Bayar</label>
            <input
              disabled
              type="number"
              name="total"
              value={formData.total}
              readOnly
              className="mt-1 p-2 w-full border rounded bg-gray-100"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-10 w-full px-8 py-8 bg-white mt-20 rounded-lg">
        <Button type="primary" className="font-semibold w-40 h-10">Simpan</Button>
        <Button type="default" className="font-semibold w-40 h-10">Batal</Button>
      </div>
    </div>
  );
};

export default FormComponent;