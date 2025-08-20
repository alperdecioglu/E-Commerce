import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-text-color text-white p-8">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className="font-bold">E-Commerce</h3>
        <div className="flex space-x-4">
          <span>FB</span>
          <span>IG</span>
          <span>TW</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;