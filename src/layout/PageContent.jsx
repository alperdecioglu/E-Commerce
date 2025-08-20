import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header'; 
import Footer from './Footer';

import HomePage from '../pages/HomePage.jsx';
import ShopPage from '../pages/ShopPage.jsx';
import ProductDetailPage from '../pages/ProductDetailPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import TeamPage from '../pages/TeamPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import SignUpPage from '../pages/SignUpPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import CartPage from '../pages/CartPage';
import ProtectedRoute from '../components/ProtectedRoute';
import OrderPage from '../pages/OrderPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import PreviousOrdersPage from '../pages/PreviousOrdersPage';

const PageContent = () => {
  return (
    <>
      <Header />
      
      <main>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          
          <Route path="/shop/:gender/:categoryName/:categoryId">
            <ShopPage />
          </Route>
          
          <Route path="/shop">
            <ShopPage />
          </Route>
          
          <Route path="/product/:productNameSlug/:productId">
            <ProductDetailPage />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route path="/team">
            <TeamPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <ProtectedRoute path="/checkout" component={OrderPage} />
          <Route path="/order-success" component={OrderSuccessPage} />
          <ProtectedRoute path="/previous-orders" component={PreviousOrdersPage} />
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default PageContent;