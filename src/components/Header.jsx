
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Header() {
    return (
        <header style={{
            background: 'var(--surface)',
            padding: '1rem',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div className="container flex-between">
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        background: 'var(--primary)',
                        padding: '6px',
                        borderRadius: '8px',
                        color: 'white',
                        display: 'flex'
                    }}>
                        <Heart size={20} fill="currentColor" />
                    </div>
                    <h1 style={{
                        fontSize: '1.25rem',
                        color: 'var(--primary-dark)',
                        fontWeight: 700,
                        margin: 0
                    }}>Growing Up</h1>
                </Link>

                {/* Placeholder for settings/profile if needed */}
                <div style={{ width: '32px' }}></div>
            </div>
        </header>
    );
}
