import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

// PAGES
import HomePage from './pages/homePage';
import BusquedaPage from './pages/busquedaPage';
import CheckoutPage from './pages/checkoutPage';
import ProductoPage from './pages/productPage';
import AdminPage from './pages/adminPage';
import CategoriaPage from './pages/categoriaPage';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <Switch>
      {/* User Routes */}
      <Route exact path='/' component={HomePage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/busqueda/:query' component={BusquedaPage} />
      <Route exact path='/catalogo' component={BusquedaPage} />
      <Route exact path='/producto' component={ProductoPage} />
      <Route exact path='/categoria/:categoria' component={CategoriaPage} />
      <Route exact path='/checkout' component={CheckoutPage} />
      <Route exact path='/producto/:producto' component={ProductoPage} />
      {/* Admin Routes */}
      <Route exact path='/admin' component={AdminPage} />
    </Switch>
  );
}

export default App;
