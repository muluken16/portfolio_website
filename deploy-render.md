# 🚀 Quick Render Fix for Express Error

## The Problem
Render is trying to run your server from the wrong directory, causing the "Cannot find package 'express'" error.

## ✅ Quick Fix Steps

### Option 1: Update Existing Service (Recommended)
1. Go to your Render dashboard
2. Click on your backend service
3. Go to **Settings**
4. Update these fields:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **Save Changes**
6. Go to **Deploy** tab and click **Deploy Latest Commit**

### Option 2: Create New Service
1. Delete the current failing service
2. Create new Web Service
3. Connect repository: `muluken16/portfolio_website`
4. Set **Root Directory** to `server` (CRITICAL!)
5. Build Command: `npm install`
6. Start Command: `npm start`

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