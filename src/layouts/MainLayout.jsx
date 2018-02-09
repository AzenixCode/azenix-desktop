// import '../assets/css/MainLayout.scss';
import React, { Component, cloneElement } from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="page page-dashboard">
      <div className="sidebar">Sidebar here</div>
      <div className="main">{children}</div>
    </div>
  )
}

export default MainLayout;
