
import React from 'react';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="min-h-screen bg-base-black font-inter text-foreground w-full">
        <Header />
        <main>{children}</main>
      </div>
  );
};

export default Layout;
