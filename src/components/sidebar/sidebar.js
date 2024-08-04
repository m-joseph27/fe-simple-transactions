import React, { useState } from 'react';
import { AppstoreOutlined, UserOutlined, ShoppingOutlined, PlusOutlined, MenuOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const BaseSidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(e.key);
    setCollapsed(true); // Collapse sidebar after navigation on mobile
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      key: 'grp',
      label: 'Menu',
      type: 'group',
      children: [
        {
          key: '/',
          label: 'Sales',
          icon: <AppstoreOutlined />,
        },
        {
          key: '/add-transaction',
          label: 'Add Transaction',
          icon: <PlusOutlined />,
        },
        {
          key: '/customers',
          label: 'Customers',
          icon: <UserOutlined />,
        },
        {
          key: '/items',
          label: 'Items',
          icon: <ShoppingOutlined />,
        }
      ],
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        className="lg:hidden mb-2"
        onClick={toggleSidebar}
        icon={<MenuOutlined />}
      />
      <div
        className={classNames("lg:block lg:relative lg:h-screen lg:overflow-hidden", {
          "absolute top-0 left-0 z-50 w-full h-screen bg-white": !collapsed,
          "hidden": collapsed
        })}
      >
        <Menu
          onClick={onClick}
          style={{
            width: 256,
          }}
          defaultSelectedKeys={['/']}
          defaultOpenKeys={['grp']}
          mode="inline"
          items={items}
          className="h-screen"
        />
      </div>
    </div>
  );
};

export default BaseSidebarComponent;