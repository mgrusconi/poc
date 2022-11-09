import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChartView } from './ChartsComponent/ChartView';

import './App.css';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<ChartView />} />
    </Routes>
  );
}

export default App;
