import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './auth/screens/LoginScreen';
import HomeScreen from './home/screens/HomeScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
