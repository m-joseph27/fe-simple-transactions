import React from 'react';
import { Button, Layout, Typography } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = ({ toggleSidebar }) => {
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
    <Header className="bg-white flex justify items-center px-4 rounded-lg">
      <Title level={4} className="mb-0 mt-2">
        Halaman 
      </Title>
      <span className="">
        / {getCurrentMenu()}
      </span>
    </Header>
  );
};

export default Navbar;