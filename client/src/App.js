import React, { useEffect } from 'react';
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
import CreateUserPage from './pages/createUserPage';
import ForgotPasswordPage from './pages/forgotPasswordPage';
import { connect } from 'react-redux';
import { checkLogin } from './store/actions';

function App({checkLogin}) {
  useEffect(() => {
    checkLogin()
  },[])
  return (
    <Switch>
      {/* User Routes */}
      <Route exact path='/' component={HomePage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/signUp' component={CreateUserPage} />
      <Route exact path='/forgotPassword' component={ForgotPasswordPage} />
      <Route exact path='/search/:query' component={BusquedaPage} />
      <Route exact path='/catalog' component={BusquedaPage} />
      <Route exact path='/product' component={ProductoPage} />
      <Route exact path='/category/:categoryId' component={CategoriaPage} />
      <Route exact path='/checkout' component={CheckoutPage} />
      <Route exact path='/product/:product' component={ProductoPage} />
      {/* Admin Routes */}
      <Route exact path='/admin' component={AdminPage} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
