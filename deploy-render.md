# 🚀 Quick Render Fix for Express Error

## The Problem
Render needs to install dependencies in both the root directory AND the server directory.

## ✅ Quick Fix Steps

### Update Your Render Service Settings
1. Go to your Render dashboard
2. Click on your backend service
3. Go to **Settings**
4. Update these fields:
   - **Root Directory**: LEAVE EMPTY (clear this field)
   - **Build Command**: `npm install && cd server && npm install`
   - **Start Command**: `cd server && npm start`
5. Click **Save Changes**
6. Go to **Deploy** tab and click **Deploy Latest Commit**

## Why This Works
- `npm install` installs root dependencies (needed for build process)
- `cd server && npm install` installs server dependencies (Express, etc.)
- `cd server && npm start` runs the server from correct directory

## 🔧 Environment Variables
Make sure these are set in Render Settings → Environment:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://mulukencs16_db_user:YOUR_ACTUAL_PASSWORD@cluster0.zxapvxa.mongodb.net/portfolio?retryWrites=true&w=majority
GEMINI_API_KEY=AIzaSyA4kb3c98zV-3GFJD-AYpYf-uzbXJOzqm0
ADMIN_PASSWORD=your_secure_password
```

**Replace `YOUR_ACTUAL_PASSWORD` with your real MongoDB password!**

## ✅ Expected Result
After fixing, your service should:
- Build successfully
- Start without Express errors
- Be accessible at your Render URL
- Health check available at `/health`

## 🆘 Still Having Issues?
Check the build logs in Render dashboard for specific error messages.