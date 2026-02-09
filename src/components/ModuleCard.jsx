
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Droplet, Shield, Smile } from 'lucide-react';

const iconMap = {
    Sparkles: Sparkles,
    Droplet: Droplet,
    Shield: Shield,
    Smile: Smile
};

export default function ModuleCard({ module }) {
    const Icon = iconMap[module.icon] || Sparkles;

    // Manual color mapping for Tailwind-like classes we defined in content.js
    const bgMap = {
        'bg-purple-100': '#F3E8FF',
        'bg-red-100': '#FFE4E6',
        'bg-blue-100': '#DBEAFE',
        'bg-yellow-100': '#FEF3C7'
    };

    const bgColor = bgMap[module.color] || '#F3F4F6';

    return (
        <Link to={`/module/${module.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card mb-2" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    background: bgColor,
                    padding: '12px',
                    borderRadius: '12px',
                    color: 'var(--text-main)',
                    display: 'grid',
                    placeItems: 'center'
                }}>
                    <Icon size={24} />
                </div>

                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                        {module.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {module.lessons.length} Lessons • Quiz
                    </p>
                </div>

                <div style={{ color: 'var(--primary-light)' }}>
                    <ArrowRight size={20} />
                </div>
            </div>
        </Link>
    );
}
