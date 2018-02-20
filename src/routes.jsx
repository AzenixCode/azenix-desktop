import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import MainLayout from './layouts/MainLayout.jsx';


const MainRoute = ({component: Component}) => <Route render={matchProps => <MainLayout>
          <Component {...matchProps} />
      </MainLayout>
    } />;

export default () => <BrowserRouter>
    <MainRoute component={Home} path="/" />
  </BrowserRouter>;
