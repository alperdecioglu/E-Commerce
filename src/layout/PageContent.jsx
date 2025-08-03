import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
// Diğer sayfalar buraya import edilecek

const PageContent = () => {
  return (
    <main className="container mx-auto py-8">
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {/* <Route path="/products">
            <ProductsPage />
          </Route>
        */}
      </Switch>
    </main>
  );
};

export default PageContent;