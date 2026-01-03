import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Disable Mongoose buffering globally to prevent hung requests
mongoose.set('bufferCommands', false);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build (production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
}

// MongoDB Connection
// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connection.on('connected', () => console.log('✅ MongoDB connected successfully'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB connection error:', err));
mongoose.connection.on('disconnected', () => console.log('⚠️ MongoDB disconnected'));

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('❌ Initial MongoDB connection error:', err.message);
    });

// Blog Post Schema
const blogSchema = new mongoose.Schema({
    title: String,
    excerpt: String,
    content: String,
    date: { type: Date, default: Date.now },
    readTime: String,
    tags: [String],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
});

const Blog = mongoose.model('Blog', blogSchema);

// Newsletter Schema
const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
    projectId: String,
    projectTitle: String,
    action: String, // 'view', 'github_click', 'demo_click'
    timestamp: { type: Date, default: Date.now },
    userAgent: String,
    ipAddress: String
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

// Gallery Schema
const gallerySchema = new mongoose.Schema({
    src: String,
    alt: String,
    title: String,
    type: { type: String, default: 'profile' }, // 'profile', 'project', etc.
    createdAt: { type: Date, default: Date.now }
});

const Gallery = mongoose.model('Gallery', gallerySchema);

// Project Description Override Schema
const projectOverrideSchema = new mongoose.Schema({
    repoName: { type: String, required: true, unique: true },
    customDescription: String,
    customTitle: String,
    customDemoLink: String,
    isHidden: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now }
});

const ProjectOverride = mongoose.model('ProjectOverride', projectOverrideSchema);

// Seed Data
const seedBlogs = async () => {
    const count = await Blog.countDocuments();
    if (count === 0) {
        const samples = [
            {
                title: 'Building Scalable React Applications',
                excerpt: 'Learn how to structure and optimize React apps for maximum performance and maintainability.',
                content: 'Long form content here...',
                date: new Date('2024-01-15'),
                readTime: '8 min read',
                tags: ['React', 'Performance', 'Architecture'],
                views: 1250,
                likes: 89
            },
            {
                title: 'The Future of Mobile Development',
                excerpt: 'Exploring emerging trends and technologies shaping the mobile development landscape.',
                content: 'Long form content here...',
                date: new Date('2024-01-08'),
                readTime: '6 min read',
                tags: ['Mobile', 'Flutter', 'React Native'],
                views: 980,
                likes: 67
            }
        ];
        await Blog.insertMany(samples);
        console.log('Sample blogs seeded');
    }

    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
        const samples = [
            { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80', alt: 'Profile 1', title: 'Professional Portrait', type: 'profile' },
            { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=800&q=80', alt: 'Coding', title: 'Development Setup', type: 'profile' }
        ];
        await Gallery.insertMany(samples);
        console.log('Sample gallery seeded');
    }
};
// Only run seedBlogs when connected
mongoose.connection.once('connected', () => {
    seedBlogs().catch(err => console.error('Seeding failed:', err));
});


// AI Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.warn('⚠️  Warning: GEMINI_API_KEY not found in environment variables');
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Routes

// Helper to check DB connection
const isDbConnected = () => mongoose.connection.readyState === 1;

// Mock Data Constants
const MOCK_BLOGS = [
    {
        _id: 'mock1',
        title: 'Building Scalable React Applications (MOCK)',
        excerpt: 'Learn how to structure and optimize React apps for maximum performance.',
        content: '# Scalability\nThis is mock data appearing because MongoDB is not connected.',
        date: new Date(),
        readTime: '8 min read',
        tags: ['React', 'Mock'],
        views: 0,
        likes: 0
    },
    {
        _id: 'mock2',
        title: 'Network Access Error? (MOCK)',
        excerpt: 'If you see this, please check your MongoDB Atlas IP Whitelist settings.',
        content: 'Go to Atlas -> Network Access -> Add IP Address 0.0.0.0/0.',
        date: new Date(),
        readTime: '5 min read',
        tags: ['Help', 'MongoDB'],
        views: 0,
        likes: 0
    }
];

const MOCK_GALLERY = [
    { _id: 'm1', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80', alt: 'Profile 1', title: 'Mock Portrait', type: 'profile' },
    { _id: 'm2', src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=800&q=80', alt: 'Coding', title: 'Mock Setup', type: 'profile' }
];

// 1. Blog Routes
app.get('/api/blogs', async (req, res) => {
    try {
        if (!isDbConnected()) {
            console.log('⚠️ MongoDB not connected. Returning mock blogs.');
            return res.json(MOCK_BLOGS);
        }
        console.log('Fetching blogs from database...');
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (error) {
        console.error('❌ Error in /api/blogs:', error);
        res.json(MOCK_BLOGS); // Fallback on any error
    }
});

app.post('/api/blogs', async (req, res) => {
    const blog = new Blog(req.body);
    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. Gallery Routes
app.get('/api/gallery', async (req, res) => {
    try {
        if (!isDbConnected()) {
            console.log('⚠️ MongoDB not connected. Returning mock gallery.');
            return res.json(MOCK_GALLERY);
        }
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.json(MOCK_GALLERY); // Fallback
    }
});

app.post('/api/gallery', async (req, res) => {
    const item = new Gallery(req.body);
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/gallery/:id', async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Gallery item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Admin Auth Route
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, token: 'mock-admin-token-123' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

// 4. Project Override Routes
app.get('/api/projects/overrides', async (req, res) => {
    try {
        if (!isDbConnected()) return res.json([]);
        const overrides = await ProjectOverride.find();
        res.json(overrides);
    } catch (error) {
        res.json([]);
    }
});

app.post('/api/projects/overrides', async (req, res) => {
    const { repoName, customDescription, customTitle, customDemoLink, isHidden } = req.body;
    try {
        const override = await ProjectOverride.findOneAndUpdate(
            { repoName },
            { customDescription, customTitle, customDemoLink, isHidden, updatedAt: Date.now() },
            { upsert: true, new: true }
        );
        res.json(override);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. Enhanced AI Chat Route with Conversation History
app.post('/api/chat', async (req, res) => {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: 'Invalid message format' });
    }

    try {
        if (!GEMINI_API_KEY) {
            throw new Error('API key not configured');
        }

        // General AI Prompt with optional context
        const systemContext = `You are a helpful, intelligent, and versatile AI assistant.

CORE INSTRUCTIONS:
1. **General Queries:** If the user asks general questions (coding, math, jokes, health, science, etc.), answer them directly and professionally like a standard AI. Do NOT mention Muluken Mesfin unless the user asks about him.
2. **Portfolio Queries:** If (and ONLY if) the user asks about "Muluken", "the developer", "this portfolio", "hiring", or "projects", use the context below to answer accurately.

---
CONTEXT DATA (Use ONLY if asked about Muluken):
- **Name:** Muluken Mesfin
- **Role:** Full-Stack Developer & Mobile App Specialist
- **Tech Stack:** React, React Native, Node.js, Python, MongoDB, MySQL
- **Location:** Addis Ababa, Ethiopia (Open to Remote)
- **Contact:** mulukencs16@gmail.com | +251 918 490 881
- **Key Projects:** Aksum Delivery (3 apps), MuyaPro Marketplace
---

RESPONSE STYLE:
- Be concise, smart, and helpful.
- No need to roleplay as "Mule Assistant" anymore. Just be a great AI.
- Format code nicely if asked.

CURRENT CONVERSATION CONTEXT:
${history.length > 0 ? `Previous messages:\n${history.map(m => `${m.role}: ${m.content}`).join('\n')}` : 'This is the start of the conversation.'}

User's current message: "${message}"

Respond naturally:`;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.9,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_NONE",
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_NONE",
                }
            ]
        });

        console.log('🤖 Processing AI request with context...');

        const result = await model.generateContent(systemContext);
        const response = await result.response;
        const text = response.text();

        console.log('✅ AI response generated successfully');

        res.json({
            response: text,
            conversationId: Date.now(), // For tracking conversations
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ AI error:', error.message);

        // Provide helpful error messages
        if (error.message.includes('API key')) {
            return res.status(500).json({
                message: 'AI service configuration error. Please check API key.',
                error: 'API_KEY_ERROR'
            });
        }

        if (error.message.includes('quota') || error.message.includes('429')) {
            return res.status(429).json({
                message: 'AI service rate limit reached. Please try again in a moment.',
                error: 'RATE_LIMIT'
            });
        }

        if (error.message.includes('safety')) {
            return res.status(400).json({
                message: 'I need to keep our conversation professional. Could you rephrase that?',
                error: 'SAFETY_FILTER'
            });
        }

        res.status(500).json({
            message: 'AI Assistant is temporarily unavailable. Please try the pattern-based responses.',
            error: 'GENERAL_ERROR'
        });
    }
});

// 2b. Generate AI Content (for blog posts, descriptions)
app.post('/api/ai/generate', async (req, res) => {
    const { prompt, type = 'general' } = req.body;

    try {
        if (!GEMINI_API_KEY) {
            throw new Error('API key not configured');
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: type === 'creative' ? 1.0 : 0.7,
                topK: 40,
                topP: 0.9,
                maxOutputTokens: 4096,
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ content: text });

    } catch (error) {
        console.error('Content generation error:', error.message);
        res.status(500).json({ message: 'Content generation failed' });
    }
});

// 3. Newsletter Routes
app.post('/api/newsletter/subscribe', async (req, res) => {
    const { email } = req.body;
    try {
        if (!isDbConnected()) return res.status(201).json({ message: 'Mock subscribed!' });
        const existing = await Newsletter.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }
        const subscription = new Newsletter({ email });
        await subscription.save();
        res.status(201).json({ message: 'Successfully subscribed!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/newsletter', async (req, res) => {
    try {
        const subscribers = await Newsletter.find({ active: true }).sort({ subscribedAt: -1 });
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Analytics Routes
app.post('/api/analytics/track', async (req, res) => {
    const { projectId, projectTitle, action } = req.body;
    try {
        const analytics = new Analytics({
            projectId,
            projectTitle,
            action,
            userAgent: req.headers['user-agent'],
            ipAddress: req.ip
        });
        await analytics.save();
        res.status(201).json({ message: 'Tracked' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/analytics/stats', async (req, res) => {
    try {
        if (!isDbConnected()) return res.json([{ _id: 'Sample Project', views: 10, githubClicks: 5, demoClicks: 2 }]);
        const stats = await Analytics.aggregate([
            {
                $group: {
                    _id: '$projectTitle',
                    views: { $sum: { $cond: [{ $eq: ['$action', 'view'] }, 1, 0] } },
                    githubClicks: { $sum: { $cond: [{ $eq: ['$action', 'github_click'] }, 1, 0] } },
                    demoClicks: { $sum: { $cond: [{ $eq: ['$action', 'demo_click'] }, 1, 0] } }
                }
            },
            { $sort: { views: -1 } }
        ]);
        res.json(stats);
    } catch (error) {
        res.json([]);
    }
});

// 5. Admin Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.json({
                blogs: MOCK_BLOGS.length,
                subscribers: 0,
                totalViews: 0,
                recentActivity: []
            });
        }
        const blogCount = await Blog.countDocuments();
        const subscriberCount = await Newsletter.countDocuments({ active: true });
        const totalViews = await Analytics.countDocuments({ action: 'view' });
        const recentAnalytics = await Analytics.find().sort({ timestamp: -1 }).limit(10);

        res.json({
            blogs: blogCount,
            subscribers: subscriberCount,
            totalViews,
            recentActivity: recentAnalytics
        });
    } catch (error) {
        res.json({ blogs: 0, subscribers: 0, totalViews: 0, recentActivity: [] });
    }
});

// Catch-all route: serve React app for any non-API routes (production)
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

// 5. Admin Dashboard Stats
// ... routes here ...

// DEBUG: Get Server Public IP (to help with MongoDB Atlas Whitelisting)
app.get('/api/debug/ip', async (req, res) => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        res.json({
            serverIp: data.ip,
            instruction: "Add this IP to MongoDB Atlas -> Network Access -> IP Whitelist"
        });
    } catch (error) {
        res.json({ error: 'Failed to fetch server IP' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    if (process.env.NODE_ENV === 'production') {
        console.log(`✅ Serving static files from dist/`);
    } else {
        console.log(`🔧 Development mode - Frontend running separately`);
    }
});
