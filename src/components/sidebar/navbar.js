import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const location = useLocation();

  const getCurrentMenu = () => {
    switch (location.pathname) {
      case '/':
        return 'Sales';
      case '/add-transaction':
        return 'Add Transaction';
      case '/customers':
        return 'Customers';
      case '/items':
        return 'Items';
      default:
        return 'Menu';
    }
  };

  return (
    <Header className="bg-white flex justify-between items-center px-4 rounded-lg">
      <div className="flex justify-center items-center">
        <Title level={5} className="mb-0 mt-2 mr-1 navbar-title">
          Halaman 
        </Title>
        <span className="navbar-subtitle text-xs mt-1">
          / {getCurrentMenu()}
        </span>
      </div>
      <div>
        <Button shape="circle" icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default Navbar;