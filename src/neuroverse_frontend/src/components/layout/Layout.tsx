
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '@/contexts/use-auth-client';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-black font-inter text-foreground">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Layout;
