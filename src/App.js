import React from 'react';
import './index.css';
import BaseTableComponent from './components/table/table';
import BaseSidebarComponent from './components/sidebar/sidebar';
import FormComponent from './components/form/form';

function App() {
  return (
    <div className="flex h-screen">
      <BaseSidebarComponent />
      <div className="flex-1 p-4 overflow-auto mx-auto">
        <BaseTableComponent />
        <FormComponent />
      </div>
    </div>
  );
}

export default App;
