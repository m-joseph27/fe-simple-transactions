import React from 'react';
import { Table } from 'antd';
import { sumBy } from 'lodash';
import CurrencyFormatter from '../../utils/currency-formatter';

const BaseTableComponent = ({ data, columns, loading }) => (
  <Table
    columns={columns}
    dataSource={data}
    bordered
    loading={loading}
    footer={() => <div className="text-lg flex justify-end items-end pr-4">
        <p className="text-sm font-semibold pr-20">Grand Total : {CurrencyFormatter.format(sumBy(data, 'grandTotal'))}</p>
      </div>
    }
    pagination={false}
    scroll={{ x: 'max-content', y: 500 }}
  />
);

export default BaseTableComponent;