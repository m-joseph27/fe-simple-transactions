import React from 'react';
import { Table } from 'antd';
import { sumBy } from 'lodash';
import CurrencyFormatter from '../../utils/currency-formatter';

const BaseTableComponent = ({ data, columns }) => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    footer={() => <div className="text-lg flex justify-end items-end pr-4">
        <p className="text-sm font-semibold pr-20">Grand Total : {CurrencyFormatter.format(sumBy(data, 'grandTotal'))}</p>
      </div>
    }
    pagination={false}
    scroll={{ x: 'max-content', y: 'h-screen' }}
  />
);

export default BaseTableComponent;