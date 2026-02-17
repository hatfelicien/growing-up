import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { LayoutDashboard, BookOpen, Layers, Plus, Trash2, LogOut } from 'lucide-react';

export default function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [modules, setModules] = useState([]);
    const [newLesson, setNewLesson] = useState({ title: '', videoId: '', content: '' });
    const [selectedModuleId, setSelectedModuleId] = useState('');
    const [newModule, setNewModule] = useState({ title: '', description: '', icon: 'Sparkles', color: 'bg-purple-100' });

    useEffect(() => {
        if (isLoggedIn) refreshData();
    }, [isLoggedIn]);

    const refreshData = async () => {
        const s = await api.getStats();
        setStats(s);
        const m = await api.syncContent();
        setModules(m);
        if (m.length > 0 && !selectedModuleId) setSelectedModuleId(m[0].id);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await api.login(username, password);
        if (result.success) {
            setIsLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleAddLesson = async (e) => {
        e.preventDefault();
        if (!selectedModuleId) return alert('Select a module');
        const lesson = {
            id: Date.now().toString(),
            title: newLesson.title,
            type: 'youtube',
            duration: '5 min',
            videoId: newLesson.videoId,
            content: newLesson.content
        };
        const result = await api.addLesson(selectedModuleId, lesson);
        if (result.success) {
            alert('Lesson Added!');
            setNewLesson({ title: '', videoId: '', content: '' });
            refreshData();
        } else {
            alert('Error adding lesson');
        }
    };

    const handleDeleteLesson = async (moduleId, lessonId) => {
        if (!confirm('Delete this lesson?')) return;
        await api.deleteLesson(moduleId, lessonId);
        refreshData();
    };

    const handleAddModule = async (e) => {
        e.preventDefault();
        const module = {
            ...newModule,
            id: newModule.title.toLowerCase().replace(/\s+/g, '-'),
            lessons: []
        };
        await api.createModule(module);
        alert('Module Created!');
        setNewModule({ title: '', description: '', icon: 'Sparkles', color: 'bg-purple-100' });
        refreshData();
    };

    const handleDeleteModule = async (moduleId) => {
        if (!confirm('Delete this module and ALL its lessons?')) return;
        await api.deleteModule(moduleId);
        refreshData();
    };

    if (!isLoggedIn) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ background: 'var(--primary)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white', fontSize: '2rem' }}>🔐</div>
                        <h2 style={{ color: 'var(--primary-dark)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Admin Portal</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Sign in to manage content</p>
                    </div>
                    <form onSubmit={handleLogin} style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 500 }}>Username</label>
                            <input type="text" required style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--surface-muted)', borderRadius: '8px', fontSize: '1rem' }} value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 500 }}>Password</label>
                            <input type="password" required style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--surface-muted)', borderRadius: '8px', fontSize: '1rem' }} value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '0.875rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Sign In</button>
                    </form>
                </div>
            </div>
        );
    }

    const SidebarItem = ({ id, icon: Icon, label }) => (
        <div onClick={() => setActiveTab(id)} style={{ cursor: 'pointer', borderRadius: '12px', padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', background: activeTab === id ? 'var(--primary-light)' : 'transparent', color: activeTab === id ? 'white' : 'var(--text-muted)', fontWeight: activeTab === id ? 600 : 400, transition: 'all 0.2s' }}>
            <Icon size={20} />
            <span>{label}</span>
        </div>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
            <div style={{ width: '280px', background: 'var(--surface)', padding: '2rem', borderRight: '1px solid var(--surface-muted)' }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px', color: 'white', display: 'flex' }}>💜</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)' }}>Growing Up</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginLeft: '3rem' }}>Admin Dashboard</p>
                </div>
                <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
                <SidebarItem id="lessons" icon={BookOpen} label="Lessons" />
                <SidebarItem id="modules" icon={Layers} label="Modules" />
                <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                    <button onClick={() => { localStorage.removeItem('adminToken'); setIsLoggedIn(false); }} style={{ width: '100%', padding: '0.875rem', border: '2px solid var(--surface-muted)', borderRadius: '12px', background: 'transparent', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500 }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
                {activeTab === 'dashboard' && (
                    <div>
                        <h2 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '2rem' }}>Dashboard Overview</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', padding: '2rem', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{stats?.modules || 0}</h3>
                                <p style={{ fontSize: '1rem', opacity: 0.9 }}>Active Modules</p>
                            </div>
                            <div style={{ background: 'linear-gradient(135deg, var(--secondary), var(--secondary-light))', padding: '2rem', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{stats?.lessons || 0}</h3>
                                <p style={{ fontSize: '1rem', opacity: 0.9 }}>Total Lessons</p>
                            </div>
                            <div style={{ background: 'linear-gradient(135deg, #10B981, #34D399)', padding: '2rem', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{stats?.users || 0}</h3>
                                <p style={{ fontSize: '1rem', opacity: 0.9 }}>Users</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'lessons' && (
                    <div>
                        <h2 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '2rem' }}>Manage Lessons</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>Add New Lesson</h3>
                                <form onSubmit={handleAddLesson} style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--surface-muted)' }}>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Select Module</label>
                                        <select style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--surface-muted)', borderRadius: '8px', fontSize: '1rem' }} value={selectedModuleId} onChange={e => setSelectedModuleId(e.target.value)}>
                                            {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                                        </select>
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Title</label>
                                        <input type="text" required style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--surface-muted)', borderRadius: '8px', fontSize: '1rem' }} value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e.target.value })} />
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Video ID (YouTube)</label>
                                        <input type="text" style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--surface-muted)', borderRadius: '8px', fontSize: '1rem' }} value={newLesson.videoId} onChange={e => setNewLesson({ ...newLesson, videoId: e.target.value })} />
                                    </div>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Content</label>
                                        <textarea rows="5" required style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--surface-muted)', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' }} value={newLesson.content} onChange={e => setNewLesson({ ...newLesson, content: e.target.value })}></textarea>
                                    </div>
                                    <button type="submit" style={{ width: '100%', padding: '0.875rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Plus size={18} /> Add Lesson</button>
                                </form>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>All Lessons</h3>
                                <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--surface-muted)', maxHeight: '600px', overflowY: 'auto' }}>
                                    {modules.map(module => (
                                        <div key={module.id} style={{ marginBottom: '1.5rem' }}>
                                            <h4 style={{ color: 'var(--primary)', fontWeight: 600, borderBottom: '2px solid var(--surface-muted)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>{module.title}</h4>
                                            {module.lessons?.map(lesson => (
                                                <div key={lesson.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--background)', borderRadius: '8px', marginBottom: '0.5rem' }}>
                                                    <span style={{ color: 'var(--text-main)' }}>{lesson.title}</span>
                                                    <button onClick={() => handleDeleteLesson(module.id, lesson.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'modules' && (
                    <div>
                        <h2 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '2rem' }}>Manage Modules</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>Create New Module</h3>
                                <form onSubmit={handleAddModule} style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--surface-muted)' }}>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Title</label>
                                        <input type="text" required style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--surface-muted)', borderRadius: '8px', fontSize: '1rem' }} value={newModule.title} onChange={e => setNewModule({ ...newModule, title: e.target.value })} />
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Description</label>
                                        <input type="text" required style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--surface-muted)', borderRadius: '8px', fontSize: '1rem' }} value={newModule.description} onChange={e => setNewModule({ ...newModule, description: e.target.value })} />
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Color</label>
                                        <select style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--surface-muted)', borderRadius: '8px', fontSize: '1rem' }} value={newModule.color} onChange={e => setNewModule({ ...newModule, color: e.target.value })}>
                                            <option value="bg-purple-100">Purple</option>
                                            <option value="bg-red-100">Red</option>
                                            <option value="bg-blue-100">Blue</option>
                                            <option value="bg-yellow-100">Yellow</option>
                                            <option value="bg-green-100">Green</option>
                                        </select>
                                    </div>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-main)' }}>Icon</label>
                                        <select style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--surface-muted)', borderRadius: '8px', fontSize: '1rem' }} value={newModule.icon} onChange={e => setNewModule({ ...newModule, icon: e.target.value })}>
                                            <option value="Sparkles">Sparkles</option>
                                            <option value="Droplet">Droplet</option>
                                            <option value="Shield">Shield</option>
                                            <option value="Smile">Smile</option>
                                        </select>
                                    </div>
                                    <button type="submit" style={{ width: '100%', padding: '0.875rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Plus size={18} /> Create Module</button>
                                </form>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>Existing Modules</h3>
                                {modules.map(module => (
                                    <div key={module.id} style={{ background: 'var(--surface)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid var(--surface-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{module.title}</strong>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{module.lessons?.length || 0} lessons</p>
                                        </div>
                                        <button onClick={() => handleDeleteModule(module.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
