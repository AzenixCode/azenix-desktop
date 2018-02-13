// import '../assets/css/MainLayout.scss';
import React, { Component, cloneElement } from 'react';
import Navbar from '../components/Navbar.jsx';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout container-fluid">
      <Navbar />
      <div className="main">{children}</div>
    </div>
  )
}

export default MainLayout;
