
import React from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-base-black font-inter text-foreground">
            <main className="container py-8">{children}</main>
        </div>
    );
};

export default AppLayout;
