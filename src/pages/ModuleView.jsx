
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../services/api';
import { PlayCircle, BookOpen, Star } from 'lucide-react';

export default function ModuleView() {
    const { moduleId } = useParams();
    const [module, setModule] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadModule = async () => {
            const modules = await api.getModules();
            const found = modules.find(m => m.id === moduleId);
            setModule(found);
            setLoading(false);
        };
        loadModule();
    }, [moduleId]);

    if (loading) return <Layout><div className="text-center p-4">Loading...</div></Layout>;
    if (!module) return <Layout><div className="text-center">Module not found</div></Layout>;

    return (
        <Layout>
            <div className="mb-4">
                <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                    &larr; Back to Home
                </Link>
                <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', color: 'var(--primary-dark)' }}>
                    {module.title}
                </h2>
                <p style={{ color: 'var(--text-muted)' }}>{module.description}</p>
            </div>

            <h3 className="mb-2" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Lessons</h3>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {module.lessons.map((lesson, index) => (
                    <Link key={lesson.id} to={`/module/${moduleId}/lesson/${lesson.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '40px', height: '40px',
                                borderRadius: '50%',
                                background: 'var(--surface-muted)',
                                display: 'grid', placeItems: 'center',
                                color: 'var(--primary)',
                                fontWeight: 'bold'
                            }}>
                                {index + 1}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{lesson.title}</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {lesson.type === 'youtube' ? <PlayCircle size={14} /> : <BookOpen size={14} />}
                                    {lesson.duration}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                <Link to={`/module/${moduleId}/quiz`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))',
                        border: 'none',
                        color: 'white'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '40px', height: '40px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.2)',
                                display: 'grid', placeItems: 'center',
                            }}>
                                <Star size={20} fill="white" />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Take the Quiz</h4>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Test your knowledge!</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </Layout>
    );
}
