# Portfolio Website - Full Stack Edition 🚀

## What's New - Backend Integration

Your portfolio is now a **full-stack application** with Node.js + MongoDB backend!

### ✨ New Features

1. **🤖 AI Chatbot (Backend Proxy)**
   - Secure API key handling
   - Rate limiting ready
   - Better error handling

2. **📝 Dynamic Blog System**
   - MongoDB-backed blog posts
   - Auto-fetches from database
   - Admin dashboard to create new posts

3. **📧 Newsletter Subscription**
   - Email collection
   - MongoDB storage
   - Success/error feedback

4. **📊 Project Analytics**
   - Track project views
   - Monitor GitHub/Demo clicks
   - Real-time stats dashboard

5. **👨‍💼 Admin Dashboard**
   - View all statistics
   - Create blog posts
   - Monitor user engagement

---

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Installation

#### 1. Install Frontend Dependencies
```powershell
npm install
```

#### 2. Install Backend Dependencies
```powershell
cd server
npm install
```

#### 3. Start MongoDB
```powershell
# Make sure MongoDB is running on localhost:27017
# If using MongoDB Compass, just start the service
```

#### 4. Start the Backend Server
```powershell
cd server
npm run dev
```
Server will start on: `http://localhost:5000`

#### 5. Start the Frontend (New Terminal)
```powershell
# From the root directory
npm run dev
```
Frontend will start on: `http://localhost:5173`

---

## 📁 Project Structure

```
portfolio_website/
├── server/                 # Backend (Node.js + Express)
│   ├── index.js           # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── src/
│   ├── components/
│   │   ├── AIChatbot.jsx         # AI Assistant (connects to backend)
│   │   ├── AdminDashboard.jsx    # Admin panel (NEW!)
│   │   └── Newsletter.jsx        # Newsletter form (NEW!)
│   └── App.jsx                    # Main app (enhanced)
└── .env                          # Frontend environment variables
```

---

## 🔌 API Endpoints

### Blog Routes
- `GET /api/blogs` - Fetch all blog posts
- `POST /api/blogs` - Create new blog post

### Newsletter Routes
- `POST /api/newsletter/subscribe` - Subscribe email
- `GET /api/newsletter` - Get all subscribers (admin)

### Analytics Routes
- `POST /api/analytics/track` - Track project interaction
- `GET /api/analytics/stats` - Get project statistics

### Admin Routes
- `GET /api/admin/stats` - Get dashboard statistics

### AI Routes
- `POST /api/chat` - Send message to AI assistant

---

## 🎨 Using the Admin Dashboard

To access the admin dashboard, you can:

1. Navigate to `/admin` route (you'll need to add routing)
2. Or import it directly in App.jsx:

```javascript
import AdminDashboard from './components/AdminDashboard';

// Add somewhere in your app
<AdminDashboard />
```

---

## 📧 Newsletter Integration

Add the Newsletter component to your App.jsx:

```javascript
import Newsletter from './components/Newsletter';

// Add in your contact section or footer
<Newsletter />
```

---

## 📊 Analytics Tracking

To track project interactions, call the analytics API:

```javascript
// When user views a project
fetch('http://localhost:5000/api/analytics/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    projectId: project.id,
    projectTitle: project.title,
    action: 'view' // or 'github_click', 'demo_click'
  })
});
```

---

## 🔐 Environment Variables

### .env (Root - Frontend)
```
VITE_GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
```

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Lucide React (icons)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Google Generative AI (Gemini)

---

## 💡 Next Steps

1. **Add Routing**: Install `react-router-dom` to create separate pages
2. **Authentication**: Add admin authentication for the dashboard
3. **Email Notifications**: Send welcome emails to newsletter subscribers
4. **Chart Visualizations**: Add charts to the admin dashboard
5. **Blog Comments**: Allow users to comment on blog posts

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check if port 5000 is available
- Verify environment variables in `.env`

### CORS errors
- The backend is configured to allow all origins in development
- For production, update the CORS settings

### Database connection errors
- Verify MongoDB is running: `mongod --version`
- Check connection string in `.env`

---

## 📝 Sample Blog Post Creation

Use the Admin Dashboard or POST to the API:

```json
{
  "title": "My New Blog Post",
  "excerpt": "A brief description",
  "content": "Full blog content here...",
  "tags": ["React", "Tutorial"],
  "readTime": "5 min read"
}
```

---

**Built with ❤️ by Muluken Mesfin**
