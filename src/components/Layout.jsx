
import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="container" style={{ paddingBottom: '4rem', paddingTop: '1.5rem' }}>
                {children}
            </main>
        </>
    );
}
