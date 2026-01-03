import React, { useState, useEffect } from 'react';
import {
    BarChart3, Users, FileText, Activity, Plus, Mail,
    TrendingUp, LogOut, Image as ImageIcon, Trash2,
    ShieldCheck, Lock, ChevronRight, Github, Edit3, Eye, EyeOff
} from 'lucide-react';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');

    const [stats, setStats] = useState({
        blogs: 0,
        subscribers: 0,
        totalViews: 0,
        recentActivity: []
    });
    const [projectStats, setProjectStats] = useState([]);
    const [galleryItems, setGalleryItems] = useState([]);
    const [githubRepos, setGithubRepos] = useState([]);
    const [projectOverrides, setProjectOverrides] = useState({});

    const [newBlog, setNewBlog] = useState({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        readTime: ''
    });

    const [newGalleryItem, setNewGalleryItem] = useState({
        src: '',
        alt: '',
        title: '',
        type: 'profile'
    });

    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        const savedAuth = localStorage.getItem('isAdminAuthenticated');
        if (savedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchStats();
            fetchProjectStats();
            fetchGallery();
            fetchGithubRepos();
            fetchProjectOverrides();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await response.json();
            if (data.success) {
                setIsAuthenticated(true);
                localStorage.setItem('isAdminAuthenticated', 'true');
                setLoginError('');
            } else {
                setLoginError('Invalid password. Try "admin123"');
            }
        } catch (error) {
            setLoginError('Server error. Please try again.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAdminAuthenticated');
    };

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchProjectStats = async () => {
        try {
            const response = await fetch('/api/analytics/stats');
            if (response.ok) {
                const data = await response.json();
                setProjectStats(data);
            }
        } catch (error) {
            console.error('Error fetching project stats:', error);
        }
    };

    const fetchGallery = async () => {
        try {
            const response = await fetch('/api/gallery');
            if (response.ok) {
                const data = await response.json();
                setGalleryItems(data);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error);
        }
    };

    const fetchGithubRepos = async () => {
        try {
            const response = await fetch('https://api.github.com/users/muluken16/repos?sort=updated&per_page=50');
            if (response.ok) {
                const data = await response.json();
                setGithubRepos(data.filter(repo => !repo.fork));
            }
        } catch (error) {
            console.error('Error fetching github repos:', error);
        }
    };

    const fetchProjectOverrides = async () => {
        try {
            const response = await fetch('/api/projects/overrides');
            if (response.ok) {
                const data = await response.json();
                const overrideMap = {};
                data.forEach(ov => {
                    overrideMap[ov.repoName] = ov;
                });
                setProjectOverrides(overrideMap);
            }
        } catch (error) {
            console.error('Error fetching overrides:', error);
        }
    };

    const handleSubmitBlog = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newBlog,
                    tags: newBlog.tags.split(',').map(t => t.trim())
                })
            });
            if (response.ok) {
                alert('Blog post created!');
                setNewBlog({ title: '', excerpt: '', content: '', tags: '', readTime: '' });
                fetchStats();
            }
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    const handleSubmitGallery = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newGalleryItem)
            });
            if (response.ok) {
                alert('Gallery item added!');
                setNewGalleryItem({ src: '', alt: '', title: '', type: 'profile' });
                fetchGallery();
            }
        } catch (error) {
            console.error('Error adding gallery item:', error);
        }
    };

    const handleDeleteGallery = async (id) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;
        try {
            const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchGallery();
            }
        } catch (error) {
            console.error('Error deleting gallery item:', error);
        }
    };

    const handleSaveOverride = async (repoName, data) => {
        try {
            const response = await fetch('/api/projects/overrides', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ repoName, ...data })
            });
            if (response.ok) {
                fetchProjectOverrides();
                setEditingProject(null);
                alert('Project updated!');
            }
        } catch (error) {
            console.error('Error saving override:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={styles.loginOverlay}>
                <div style={styles.loginCard}>
                    <div style={styles.loginHeader}>
                        <ShieldCheck size={48} color="#3b82f6" />
                        <h1 style={styles.loginTitle}>Admin Access</h1>
                        <p style={styles.loginSubtitle}>Enter your password to continue</p>
                    </div>
                    <form onSubmit={handleLogin} style={styles.loginForm}>
                        <div style={styles.inputGroup}>
                            <Lock size={18} style={styles.inputIcon} />
                            <input
                                type="password"
                                style={styles.loginInput}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                        </div>
                        {loginError && <p style={styles.errorText}>{loginError}</p>}
                        <button type="submit" style={styles.loginBtn}>
                            Unlock Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>📊 Admin Dashboard</h1>
                    <p style={styles.subtitle}>Welcome back, Muluken</p>
                </div>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    <LogOut size={18} />
                    Logout
                </button>
            </header>

            {/* Sidebar / Tabs */}
            <div style={styles.tabs}>
                <button
                    onClick={() => setActiveTab('dashboard')}
                    style={{ ...styles.tab, ...(activeTab === 'dashboard' ? styles.activeTab : {}) }}
                >
                    <BarChart3 size={18} /> Dashboard
                </button>
                <button
                    onClick={() => setActiveTab('blogs')}
                    style={{ ...styles.tab, ...(activeTab === 'blogs' ? styles.activeTab : {}) }}
                >
                    <FileText size={18} /> Blogs
                </button>
                <button
                    onClick={() => setActiveTab('gallery')}
                    style={{ ...styles.tab, ...(activeTab === 'gallery' ? styles.activeTab : {}) }}
                >
                    <ImageIcon size={18} /> Gallery
                </button>
                <button
                    onClick={() => setActiveTab('projects')}
                    style={{ ...styles.tab, ...(activeTab === 'projects' ? styles.activeTab : {}) }}
                >
                    <Github size={18} /> Projects
                </button>
            </div>

            {activeTab === 'dashboard' && (
                <>
                    {/* Stats Grid */}
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <FileText size={32} color="#3b82f6" />
                            <div>
                                <div style={styles.statNumber}>{stats.blogs}</div>
                                <div style={styles.statLabel}>Blog Posts</div>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <Users size={32} color="#10b981" />
                            <div>
                                <div style={styles.statNumber}>{stats.subscribers}</div>
                                <div style={styles.statLabel}>Subscribers</div>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <Activity size={32} color="#f59e0b" />
                            <div>
                                <div style={styles.statNumber}>{stats.totalViews}</div>
                                <div style={styles.statLabel}>Total Views</div>
                            </div>
                        </div>
                    </div>

                    {/* Project Analytics */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <TrendingUp size={24} /> Project Analytics
                        </h2>
                        <div style={styles.table}>
                            {projectStats.map((proj, idx) => (
                                <div key={idx} style={styles.tableRow}>
                                    <div style={styles.projectName}>{proj._id}</div>
                                    <div style={styles.metrics}>
                                        <span>👁️ {proj.views} views</span>
                                        <span>🔗 {proj.githubClicks} GitHub</span>
                                        <span>🚀 {proj.demoClicks} demos</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'blogs' && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        <Plus size={24} /> Create New Blog Post
                    </h2>
                    <form onSubmit={handleSubmitBlog} style={styles.form}>
                        <input
                            style={styles.input}
                            placeholder="Title"
                            value={newBlog.title}
                            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                            required
                        />
                        <textarea
                            style={{ ...styles.input, minHeight: '80px' }}
                            placeholder="Excerpt (Brief summary)"
                            value={newBlog.excerpt}
                            onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                            required
                        />
                        <textarea
                            style={{ ...styles.input, minHeight: '300px' }}
                            placeholder="Blog Content (Markdown supported)"
                            value={newBlog.content}
                            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                            required
                        />
                        <div style={styles.inputRow}>
                            <input
                                style={{ ...styles.input, flex: 1 }}
                                placeholder="Tags (comma separated: React, Mobile...)"
                                value={newBlog.tags}
                                onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                            />
                            <input
                                style={{ ...styles.input, flex: 1 }}
                                placeholder="Read Time (e.g., 5 min read)"
                                value={newBlog.readTime}
                                onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                            />
                        </div>
                        <button type="submit" style={styles.submitBtn}>
                            Publish Blog Post
                        </button>
                    </form>
                </div>
            )}

            {activeTab === 'gallery' && (
                <div style={styles.galleryContainer}>
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>
                            <ImageIcon size={24} /> Add Gallery Image
                        </h2>
                        <form onSubmit={handleSubmitGallery} style={styles.form}>
                            <input
                                style={styles.input}
                                placeholder="Image URL (Direct link)"
                                value={newGalleryItem.src}
                                onChange={(e) => setNewGalleryItem({ ...newGalleryItem, src: e.target.value })}
                                required
                            />
                            <div style={styles.inputRow}>
                                <input
                                    style={{ ...styles.input, flex: 1 }}
                                    placeholder="Title"
                                    value={newGalleryItem.title}
                                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                                />
                                <select
                                    style={{ ...styles.input, flex: 1 }}
                                    value={newGalleryItem.type}
                                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, type: e.target.value })}
                                >
                                    <option value="profile">Profile Gallery</option>
                                    <option value="project">Project Image</option>
                                </select>
                            </div>
                            <button type="submit" style={styles.submitBtn}>
                                Add to Gallery
                            </button>
                        </form>
                    </div>

                    <div style={styles.galleryGrid}>
                        {galleryItems.map((item) => (
                            <div key={item._id} style={styles.galleryCard}>
                                <img src={item.src} alt={item.alt} style={styles.galleryThumb} />
                                <div style={styles.galleryInfo}>
                                    <div style={styles.galleryTag}>{item.type}</div>
                                    <button
                                        onClick={() => handleDeleteGallery(item._id)}
                                        style={styles.deleteBtn}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'projects' && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        <Github size={24} /> GitHub Project Customization
                    </h2>
                    <p style={{ color: '#64748b', marginBottom: '20px' }}>
                        Override repository titles/descriptions or hide them from your portfolio.
                    </p>
                    <div style={styles.projectList}>
                        {githubRepos.map(repo => {
                            const override = projectOverrides[repo.name] || {};
                            const isEditing = editingProject === repo.name;

                            return (
                                <div key={repo.id} style={styles.projectListItem}>
                                    <div style={styles.projectListHeader}>
                                        <div style={styles.projectListInfo}>
                                            <span style={styles.repoName}>{repo.name}</span>
                                            {override.isHidden && <span style={styles.hiddenBadge}>Hidden</span>}
                                        </div>
                                        <button
                                            onClick={() => setEditingProject(isEditing ? null : repo.name)}
                                            style={styles.editBtn}
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                    </div>

                                    {isEditing ? (
                                        <div style={styles.editProjectForm}>
                                            <div style={styles.inputLabel}>Display Name</div>
                                            <input
                                                style={styles.input}
                                                placeholder="Custom Title (leave blank for default)"
                                                defaultValue={override.customTitle || ''}
                                                id={`title-${repo.name}`}
                                            />
                                            <div style={styles.inputLabel}>Live Demo / View Link</div>
                                            <input
                                                style={styles.input}
                                                placeholder="Demo Link (URL)"
                                                defaultValue={override.customDemoLink || ''}
                                                id={`demo-${repo.name}`}
                                            />
                                            <div style={styles.inputLabel}>Description</div>
                                            <textarea
                                                style={{ ...styles.input, minHeight: '80px' }}
                                                placeholder="Custom Description"
                                                defaultValue={override.customDescription || repo.description || ''}
                                                id={`desc-${repo.name}`}
                                            />
                                            <div style={styles.checkboxGroup}>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={override.isHidden}
                                                    id={`hide-${repo.name}`}
                                                />
                                                <label htmlFor={`hide-${repo.name}`}>Hide from portfolio</label>
                                            </div>
                                            <div style={styles.editActions}>
                                                <button
                                                    style={styles.saveBtn}
                                                    onClick={() => handleSaveOverride(repo.name, {
                                                        customTitle: document.getElementById(`title-${repo.name}`).value,
                                                        customDemoLink: document.getElementById(`demo-${repo.name}`).value,
                                                        customDescription: document.getElementById(`desc-${repo.name}`).value,
                                                        isHidden: document.getElementById(`hide-${repo.name}`).checked
                                                    })}
                                                >
                                                    Save Changes
                                                </button>
                                                <button
                                                    style={styles.cancelBtn}
                                                    onClick={() => setEditingProject(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={styles.projectPreview}>
                                            <p style={styles.previewTitle}>
                                                <strong>Name:</strong> {override.customTitle || repo.name}
                                            </p>
                                            <p style={styles.previewTitle}>
                                                <strong>Link:</strong> {override.customDemoLink || 'Default (GitHub)'}
                                            </p>
                                            <p style={styles.previewDesc}>
                                                <strong>Desc:</strong> {override.customDescription || repo.description || 'No description'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    // Login Styles
    loginOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3000
    },
    loginCard: {
        background: 'white',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
    },
    loginHeader: {
        marginBottom: '32px'
    },
    loginTitle: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1e293b',
        marginTop: '16px'
    },
    loginSubtitle: {
        color: '#64748b',
        marginTop: '8px'
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    inputIcon: {
        position: 'absolute',
        left: '12px',
        color: '#64748b'
    },
    loginInput: {
        width: '100%',
        padding: '12px 12px 12px 40px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        fontSize: '16px',
        transition: 'border-color 0.2s'
    },
    loginBtn: {
        background: '#3b82f6',
        color: 'white',
        padding: '12px',
        borderRadius: '12px',
        border: 'none',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.2s'
    },
    errorText: {
        color: '#ef4444',
        fontSize: '14px',
        marginTop: '-10px'
    },

    // Dashboard Styles
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
    },
    title: {
        fontSize: '32px',
        fontWeight: '800',
        color: '#1e293b'
    },
    subtitle: {
        color: '#64748b',
        fontSize: '16px'
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        background: '#fee2e2',
        color: '#ef4444',
        border: 'none',
        borderRadius: '12px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    tabs: {
        display: 'flex',
        gap: '12px',
        marginBottom: '32px',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '16px'
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        background: 'transparent',
        border: 'none',
        color: '#64748b',
        fontWeight: '600',
        cursor: 'pointer',
        borderRadius: '8px'
    },
    activeTab: {
        background: '#eff6ff',
        color: '#3b82f6'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
    },
    statCard: {
        background: 'white',
        padding: '24px',
        borderRadius: '20px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    statNumber: {
        fontSize: '32px',
        fontWeight: '800',
        color: '#1e293b'
    },
    statLabel: {
        color: '#64748b'
    },
    section: {
        background: 'white',
        padding: '32px',
        borderRadius: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '32px'
    },
    sectionTitle: {
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#1e293b'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    input: {
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        fontSize: '15px',
        width: '100%'
    },
    inputRow: {
        display: 'flex',
        gap: '16px'
    },
    submitBtn: {
        background: '#3b82f6',
        color: 'white',
        padding: '14px',
        borderRadius: '12px',
        border: 'none',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer'
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    tableRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        background: '#f8fafc',
        borderRadius: '12px'
    },
    metrics: {
        display: 'flex',
        gap: '20px',
        fontSize: '14px',
        color: '#64748b'
    },
    galleryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
    },
    galleryCard: {
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    galleryThumb: {
        width: '100%',
        height: '150px',
        objectFit: 'cover'
    },
    galleryInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    galleryTag: {
        background: 'rgba(255,255,255,0.2)',
        padding: '2px 8px',
        borderRadius: '4px',
        color: 'white',
        fontSize: '12px',
        backdropFilter: 'blur(4px)'
    },
    deleteBtn: {
        background: '#ef4444',
        color: 'white',
        border: 'none',
        padding: '6px',
        borderRadius: '6px',
        cursor: 'pointer'
    },

    // Project List Styles
    projectList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    projectListItem: {
        padding: '20px',
        background: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
    },
    repoName: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#1e293b'
    },
    editBtn: {
        background: 'white',
        border: '1px solid #e2e8f0',
        padding: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
        color: '#64748b'
    },
    projectListHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    inputLabel: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#64748b',
        marginBottom: '-8px',
        marginLeft: '4px',
        textTransform: 'uppercase'
    },
    editProjectForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '12px'
    },
    checkboxGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#64748b'
    },
    editActions: {
        display: 'flex',
        gap: '12px',
        marginTop: '8px'
    },
    saveBtn: {
        background: '#10b981',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    cancelBtn: {
        background: '#e2e8f0',
        color: '#475569',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    projectPreview: {
        fontSize: '14px',
        color: '#475569'
    },
    previewTitle: {
        marginBottom: '4px'
    },
    hiddenBadge: {
        background: '#fee2e2',
        color: '#ef4444',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '600',
        marginLeft: '10px'
    },
    projectListInfo: {
        display: 'flex',
        alignItems: 'center'
    }
};

export default AdminDashboard;
