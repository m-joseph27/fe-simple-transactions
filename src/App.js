import React from 'react';
import { Button } from 'antd';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="App-header bg-blue-500 text-white p-4">
        <h1 className="text-4xl font-bold">Welcome to React with Ant Design and Tailwind CSS</h1>
        <Button type="primary" className="mt-4">
          Ant Design Button
        </Button>
      </header>
    </div>
  );
}

export default App;
