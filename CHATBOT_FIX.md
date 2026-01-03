# 🚨 QUICK FIX - Chatbot Not Working

## ❌ Current Problem
**Error:** "The AI assistant is temporarily unavailable"

**Reason:** The backend server is not running!

---

## ✅ Solution - Start the Backend Server

### Step 1: Open a NEW Terminal/PowerShell Window

### Step 2: Install Backend Dependencies (FIRST TIME ONLY)
```powershell
cd c:\Users\2m\Music\portfolio_website\server
npm install
```

Wait for installation to complete (this may take 1-2 minutes).

### Step 3: Start the Backend Server
```powershell
npm run dev
```

You should see:
```
Server running on port 5000
Connected to MongoDB
```

---

## 🎯 What's Happening?

Your portfolio uses **2 servers**:

1. **Frontend** (Port 5173) ← Already running ✅
   - Your React app
   - The website UI

2. **Backend** (Port 5000) ← NOT running ❌
   - AI chatbot API
   - Blog posts API
   - Newsletter API

The chatbot on your website tries to call `http://localhost:5000/api/chat`
If the backend isn't running → "temporarily unavailable" error

---

## 📋 Full Startup Checklist

### Terminal 1 (Frontend) - ALREADY RUNNING ✅
```powershell
cd c:\Users\2m\Music\portfolio_website
npm run dev
```
**Status:** ✅ Running on http://localhost:5173

### Terminal 2 (Backend) - NEED TO START ❌
```powershell
cd c:\Users\2m\Music\portfolio_website\server
npm install  # First time only
npm run dev
```
**Status:** ❌ Not running

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org

### Problem: "Port 5000 already in use"
**Solution:** 
```powershell
# Find what's using port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess

# Kill it (if safe)
Stop-Process -Id [PROCESS_ID]
```

### Problem: "Cannot find module @google/generative-ai"
**Solution:**
```powershell
cd server
npm install @google/generative-ai@latest
```

### Problem: "MongoDB connection error"
**Options:**
1. Install MongoDB locally
2. Use MongoDB Atlas (cloud)
3. Comment out MongoDB code (chatbot will still work!)

---

## 🧪 Test if Backend is Running

Open your browser and go to:
```
http://localhost:5000/api/blogs
```

**If backend is running:** You'll see JSON data (blog posts)
**If backend is NOT running:** "This site can't be reached"

---

## ⚡ Quick Test Commands

### Check if backend is running:
```powershell
curl http://localhost:5000/api/blogs
```

### Test the chatbot API:
```powershell
curl -X POST http://localhost:5000/api/chat `
  -H "Content-Type: application/json" `
  -d '{"message":"Hello"}'
```

If it returns JSON with a response → ✅ Working!

---

## 🎯 Expected Console Output

When both servers are running correctly:

**Terminal 1 (Frontend):**
```
  VITE v5.x.x  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Terminal 2 (Backend):**
```
Server running on port 5000
Connected to MongoDB
⚠️  Warning: GEMINI_API_KEY loaded
🤖 Processing AI request with context...
✅ AI response generated successfully
```

---

## 📝 After Backend Starts

1. Go to your website: http://localhost:5173
2. Click the chatbot icon (🤖)
3. Send a message: "Hello"
4. You should get an AI response!

---

## 💡 Pro Tips

**Keep Both Terminals Open:**
- Terminal 1: Frontend (already open)
- Terminal 2: Backend (open a new one)

**Use nodemon:**
Backend auto-restarts when you edit server code!

**Check Logs:**
The backend terminal shows all AI requests and errors

---

**🎉 Once you start the backend, the chatbot will work perfectly!**

Need help? Check the logs in Terminal 2 for detailed error messages.
