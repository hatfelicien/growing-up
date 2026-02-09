
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

    // Forms
    const [newLesson, setNewLesson] = useState({ title: '', videoId: '', content: '' });
    const [selectedModuleId, setSelectedModuleId] = useState('');
    const [newModule, setNewModule] = useState({ title: '', description: '', icon: 'Sparkles', color: 'bg-purple-100' });

    useEffect(() => {
        if (isLoggedIn) {
            refreshData();
        }
    }, [isLoggedIn]);

    const refreshData = async () => {
        const s = await api.getStats();
        setStats(s);
        const m = await api.syncContent(); // Ensure we have latest
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
        if (!confirm('Are you sure you want to delete this lesson?')) return;
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
            <div className="container" style={{ paddingTop: '4rem', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Admin Login</h2>
                <form onSubmit={handleLogin} className="card">
                    <div className="mb-2">
                        <label>Username</label>
                        <input type="text" className="w-full p-2 border rounded" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label>Password</label>
                        <input type="password" className="w-full p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Login</button>
                </form>
            </div>
        );
    }

    const SidebarItem = ({ id, icon: Icon, label }) => (
        <div
            onClick={() => setActiveTab(id)}
            className={`cursor-pointer rounded-lg p-3 flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 transition-colors ${activeTab === id
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            <Icon size={20} />
            <span className="text-xs md:text-sm font-medium">{label}</span>
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 pb-20 md:pb-0">
            {/* Sidebar (Desktop) / Bottom Nav (Mobile) */}
            <div className="fixed md:relative bottom-0 left-0 right-0 z-50 bg-white border-t md:border-t-0 md:border-r border-gray-200 md:w-64 md:h-screen md:p-5 flex md:flex-col justify-around md:justify-start shadow-lg md:shadow-none">
                <div className="hidden md:block mb-8">
                    <h3 className="text-xl font-bold text-purple-700">Admin Panel</h3>
                </div>

                <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
                <SidebarItem id="lessons" icon={BookOpen} label="Lessons" />
                <SidebarItem id="modules" icon={Layers} label="Modules" />

                <div className="hidden md:block mt-auto pt-5">
                    <button
                        onClick={() => { localStorage.removeItem('adminToken'); setIsLoggedIn(false); }}
                        className="w-full border border-gray-300 rounded-lg p-2 text-gray-600 hover:bg-gray-100 flex items-center justify-center gap-2"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            {/* Mobile Header (Logout) */}
            <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-40">
                <h3 className="font-bold text-purple-700">Admin Panel</h3>
                <button
                    onClick={() => { localStorage.removeItem('adminToken'); setIsLoggedIn(false); }}
                    className="text-gray-500"
                >
                    <LogOut size={20} />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">

                {/* DASHBOARD TAB */}
                {activeTab === 'dashboard' && (
                    <div>
                        <h2 className="mb-4">Dashboard Overview</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            <div className="card text-center">
                                <h3 style={{ fontSize: '3rem', color: 'var(--primary)' }}>{stats?.modules || 0}</h3>
                                <p>Active Modules</p>
                            </div>
                            <div className="card text-center">
                                <h3 style={{ fontSize: '3rem', color: 'var(--secondary)' }}>{stats?.lessons || 0}</h3>
                                <p>Total Lessons</p>
                            </div>
                            <div className="card text-center">
                                <h3 style={{ fontSize: '3rem', color: 'var(--success)' }}>{stats?.users || 0}</h3>
                                <p>Users</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* LESSONS TAB */}
                {activeTab === 'lessons' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        <div>
                            <h3 className="mb-4">Add New Lesson</h3>
                            <form onSubmit={handleAddLesson} className="card">
                                <div className="mb-2">
                                    <label>Select Module</label>
                                    <select className="w-full p-2 border rounded" value={selectedModuleId} onChange={e => setSelectedModuleId(e.target.value)}>
                                        {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label>Title</label>
                                    <input type="text" required className="w-full p-2 border rounded" value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e.target.value })} />
                                </div>
                                <div className="mb-2">
                                    <label>Video ID (YouTube)</label>
                                    <input type="text" className="w-full p-2 border rounded" value={newLesson.videoId} onChange={e => setNewLesson({ ...newLesson, videoId: e.target.value })} />
                                </div>
                                <div className="mb-2">
                                    <label>Content</label>
                                    <textarea rows="4" required className="w-full p-2 border rounded" value={newLesson.content} onChange={e => setNewLesson({ ...newLesson, content: e.target.value })}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Add Lesson</button>
                            </form>
                        </div>

                        <div>
                            <h3 className="mb-4">Manage Lessons</h3>
                            <div className="card" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                {modules.map(module => (
                                    <div key={module.id} className="mb-4">
                                        <h4 style={{ color: 'var(--text-muted)', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>{module.title}</h4>
                                        {module.lessons.map(lesson => (
                                            <div key={lesson.id} className="flex-between p-2 border-bottom">
                                                <span>{lesson.title}</span>
                                                <button onClick={() => handleDeleteLesson(module.id, lesson.id)} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* MODULES TAB */}
                {activeTab === 'modules' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        <div>
                            <h3 className="mb-4">Create New Module</h3>
                            <form onSubmit={handleAddModule} className="card">
                                <div className="mb-2">
                                    <label>Title</label>
                                    <input type="text" required className="w-full p-2 border rounded" value={newModule.title} onChange={e => setNewModule({ ...newModule, title: e.target.value })} />
                                </div>
                                <div className="mb-2">
                                    <label>Description</label>
                                    <input type="text" required className="w-full p-2 border rounded" value={newModule.description} onChange={e => setNewModule({ ...newModule, description: e.target.value })} />
                                </div>
                                <div className="mb-2">
                                    <label>Color Class</label>
                                    <select className="w-full p-2 border rounded" value={newModule.color} onChange={e => setNewModule({ ...newModule, color: e.target.value })}>
                                        <option value="bg-purple-100">Purple</option>
                                        <option value="bg-red-100">Red</option>
                                        <option value="bg-blue-100">Blue</option>
                                        <option value="bg-yellow-100">Yellow</option>
                                        <option value="bg-green-100">Green</option>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label>Icon</label>
                                    <select className="w-full p-2 border rounded" value={newModule.icon} onChange={e => setNewModule({ ...newModule, icon: e.target.value })}>
                                        <option value="Sparkles">Sparkles</option>
                                        <option value="Droplet">Droplet</option>
                                        <option value="Shield">Shield</option>
                                        <option value="Smile">Smile</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary"><Plus size={16} /> Create Module</button>
                            </form>
                        </div>

                        <div>
                            <h3 className="mb-4">Existing Modules</h3>
                            {modules.map(module => (
                                <div key={module.id} className="card mb-2 flex-between">
                                    <div>
                                        <strong>{module.title}</strong>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{module.lessons.length} lessons</p>
                                    </div>
                                    <button onClick={() => handleDeleteModule(module.id)} className="btn" style={{ color: 'var(--error)', padding: '5px' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
