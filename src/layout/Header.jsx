import React from 'react';

const Header = () => {
  return (
    <header className="py-6 px-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bandage</h1>
        <nav className="hidden md:flex items-center space-x-4">
          <a href="/">Home</a>
          <a href="/products">Shop</a>
        </nav>
        <div className="text-xl">☰</div> {/* Mobil menü ikonu */}
      </div>
    </header>
  );
};

export default Header;