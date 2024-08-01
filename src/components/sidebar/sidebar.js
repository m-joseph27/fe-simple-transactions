import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: 'Navigation One',
    children: [
      {
        key: '11',
        label: 'Option 1',
      },
      {
        key: '12',
        label: 'Option 2',
      },
      {
        key: '13',
        label: 'Option 3',
      },
      {
        key: '14',
        label: 'Option 4',
      },
    ],
  }
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

const BaseSidebarComponent = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['1', '2']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <Menu
      mode="inline"
      openKeys={stateOpenKeys}
      defaultSelectedKeys={['1']}
      onOpenChange={onOpenChange}
      style={{
        width: 350,
      }}
      items={items}
      className="h-screen"
    />
  );
};
export default BaseSidebarComponent;