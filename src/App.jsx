import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import PageContent from './layout/PageContent';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <PageContent />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;