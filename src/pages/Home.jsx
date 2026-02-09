
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ModuleCard from '../components/ModuleCard';
import { api } from '../services/api';

export default function Home() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            // First load from cache for speed
            const cached = await api.getModules();
            if (cached && cached.length > 0) {
                setModules(cached);
                setLoading(false);
            }

            // Then try to sync from server
            const fresh = await api.syncContent();
            if (fresh && fresh.length > 0) {
                setModules(fresh);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <Layout>
            <div className="mb-4">
                <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                    Hello, Friend! 👋
                </h2>
                <p style={{ color: 'var(--text-muted)' }}>
                    Welcome to your safe space to learn and grow. What would you like to explore today?
                </p>
            </div>

            <div className="mb-4">
                <h3 className="mb-2" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Your Journey</h3>
                {loading ? (
                    <div className="text-center p-4">Loading modules...</div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {modules.map(module => (
                            <ModuleCard key={module.id} module={module} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
