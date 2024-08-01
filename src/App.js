import React from 'react';
import './index.css';
import BaseSidebarComponent from './components/sidebar/sidebar';
import FormComponent from './components/form/form';
import SalesPage from './pages/sales';

function App() {
  return (
    <div className="flex h-screen">
      <BaseSidebarComponent />
      <div className="flex-1 p-4 overflow-auto mx-auto">
        <SalesPage />
        {/* <FormComponent /> */}
      </div>
    </div>
  );
}

export default App;
