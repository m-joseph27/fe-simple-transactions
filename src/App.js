import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BaseSidebarComponent from './components/sidebar/sidebar';
import SalesPage from './pages/sales/sales';
import SalesFormComponent from './pages/sales/sales-form';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
      <BaseSidebarComponent />
      <div className="flex-1 p-4 overflow-auto mx-auto">
        <Routes>
          <Route path="/" element={<SalesPage />} />
          <Route path="/add-transaction" element={<SalesFormComponent />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
