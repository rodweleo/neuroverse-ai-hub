
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-base-black font-inter text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
