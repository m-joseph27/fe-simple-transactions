import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    key: 'grp',
    label: 'List',
    type: 'group',
    children: [
      {
        key: '13',
        label: 'Transactions',
        icon: <AppstoreOutlined />,
      }
    ],
  },
];
const BaseSidebarComponent = () => {
  const onClick = (e) => {
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      className="h-screen"
    />
  );
};
export default BaseSidebarComponent;