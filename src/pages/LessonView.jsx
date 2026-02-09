
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../services/api';
import { PlayCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function LessonView() {
    const { moduleId, lessonId } = useParams();
    const [module, setModule] = useState(null);
    const [lesson, setLesson] = useState(null);
    const [nextLesson, setNextLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const modules = await api.getModules();
            const foundModule = modules.find(m => m.id === moduleId);

            if (foundModule) {
                const foundLesson = foundModule.lessons.find(l => l.id === lessonId);
                const currentIndex = foundModule.lessons.findIndex(l => l.id === lessonId);
                const foundNext = foundModule.lessons[currentIndex + 1];

                setModule(foundModule);
                setLesson(foundLesson);
                setNextLesson(foundNext);
            }
            setLoading(false);
        };
        loadData();
    }, [moduleId, lessonId]);

    if (loading) return <Layout><div className="text-center p-4">Loading...</div></Layout>;
    if (!module || !lesson) return <Layout><div className="text-center">Lesson not found</div></Layout>;

    return (
        <Layout>
            <div className="mb-4">
                <Link to={`/module/${moduleId}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
                    &larr; Back to Module
                </Link>
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                        background: 'var(--primary-light)',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                    }}>
                        Lesson
                    </span>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', margin: 0 }}>
                        {lesson.title}
                    </h2>
                </div>
            </div>

            <div className="card mb-4">
                {lesson.type === 'youtube' && (
                    <div style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                        <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${lesson.videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: 'var(--text-main)' }}>
                    {lesson.content}
                </div>
            </div>

            <div className="text-center" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to={`/module/${moduleId}`} className="btn btn-secondary">
                    <CheckCircle size={20} />
                    Complete
                </Link>

                {nextLesson && (
                    <Link to={`/module/${moduleId}/lesson/${nextLesson.id}`} className="btn btn-primary">
                        Next Lesson <ArrowRight size={20} />
                    </Link>
                )}
            </div>
        </Layout>
    );
}
