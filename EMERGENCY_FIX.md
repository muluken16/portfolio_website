# 🚨 EMERGENCY FIX - Chatbot Not Working

## The Problem
You're running: `npm run dev` ← **ONLY FRONTEND**
You need: **FRONTEND + BACKEND**

## ✅ SOLUTION - Do This NOW:

### Option 1: EASIEST (Double-click the file)
1. **Stop** the current terminal (Ctrl+C)
2. Go to your project folder
3. **Double-click** `START.bat`
4. Wait for both servers to start
5. Chatbot will work! ✅

### Option 2: Command Line
```powershell
# Stop current server (Ctrl+C)

# Then run:
npm run dev:all
```

### Option 3: Two Separate Terminals
**Terminal 1:**
```powershell
npm run dev
```

**Terminal 2 (NEW):**
```powershell
cd server
npm install
npm run dev
```

---

## 🎯 What You'll See When It's Working:

```
[0] VITE v5.x.x ready in 234 ms
[0] ➜ Local: http://localhost:5173/

[1] Server running on port 5000
[1] Connected to MongoDB
[1] 🔧 Development mode
```

**[0] = Frontend | [1] = Backend** ← BOTH must be running!

---

## 🧪 Quick Test

1. Open: http://localhost:5000/api/blogs
2. You should see JSON data
3. If you see "Cannot connect" → Backend not running!

---

## 📋 Checklist

- [ ] Kill current `npm run dev` (press Ctrl+C)
- [ ] Run ONE of the options above
- [ ] See BOTH servers start (look for [0] and [1])
- [ ] Go to http://localhost:5173
- [ ] Click chatbot 🤖
- [ ] Send message
- [ ] ✅ AI responds!

---

## 🐛 If Still Not Working

Check server terminal for errors:
- MongoDB connection error? → Install MongoDB or comment out DB code
- Port 5000 in use? → Kill other process or change port
- Module not found? → Run `cd server && npm install`

---

**The chatbot NEEDS the backend server running on port 5000!**
