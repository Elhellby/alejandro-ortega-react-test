import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './utils/ProtectedRoute'

import Home from './pages/home/home'
import Login from './pages/login/login'
import Employees from './pages/employees/employees';
import Upload from './pages/upload/upload';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path='/employees' element={<ProtectedRoute><Employees/></ProtectedRoute>} />
          <Route path='/upload' element={<ProtectedRoute><Upload/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
