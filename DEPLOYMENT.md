# CRM + Accounting Management System - Deployment Guide

This guide covers deploying your full-stack CRM application with separate frontend and backend hosting.

## 📋 Table of Contents
- [Architecture Overview](#architecture-overview)
- [Local Development Setup](#local-development-setup)
- [Option 1: Deploy to Vercel (Frontend) + Railway (Backend)](#option-1-deploy-to-vercel-frontend--railway-backend)
- [Option 2: Deploy to Vercel (Frontend) + Render (Backend)](#option-2-deploy-to-vercel-frontend--render-backend)
- [Option 3: Deploy Everything to Railway](#option-3-deploy-everything-to-railway)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

Your application consists of:
- **Frontend**: React + TypeScript + Vite (client/ folder)
- **Backend**: Express + Node.js (server/ folder)
- **Database**: PostgreSQL
- **Authentication**: JWT tokens stored in localStorage

**Deployment Strategy**: Frontend and backend deployed separately, communicating via API calls.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL installed locally (or use a cloud database)
- Git installed

### Step 1: Clone/Download Your Code
```bash
# If you have git repo
git clone <your-repo-url>
cd crm-accounting-system

# Or download from Replit and extract
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/crm_db

# Session Secret (generate a random string)
SESSION_SECRET=your-super-secret-random-string-here

# Port (optional, defaults to 5000)
PORT=5000
```

**Note**: If you don't have PostgreSQL locally, you can:
- Use [Neon](https://neon.tech) (free PostgreSQL cloud database)
- Use [Supabase](https://supabase.com) (free tier available)
- Use Railway/Render's PostgreSQL addon

### Step 4: Set Up Database

**Option A: Using Neon/Cloud Database**
1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string to `DATABASE_URL` in `.env`

**Option B: Using Local PostgreSQL**
```bash
# Create database
createdb crm_db

# Or using psql
psql -U postgres
CREATE DATABASE crm_db;
\q
```

### Step 5: Push Database Schema
```bash
npm run db:push
```

### Step 6: Seed Database with Demo Data
```bash
npx tsx server/seed.ts
```

This creates 6 demo user accounts:
- admin / admin123
- manager / manager123
- sales / sales123
- accountant / account123
- engineer / eng123
- client / client123

### Step 7: Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5000` and login with any demo account!

---

## 🚀 Option 1: Deploy to Vercel (Frontend) + Railway (Backend)

This is the **recommended approach** for separate frontend/backend deployment.

### Part A: Deploy Backend to Railway

#### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

#### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect your GitHub repository
4. Railway will auto-detect it's a Node.js app

#### Step 3: Add PostgreSQL Database
1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway automatically creates `DATABASE_URL` environment variable

#### Step 4: Configure Environment Variables
In Railway project settings, add:
```
SESSION_SECRET=your-super-secret-random-string-here
NODE_ENV=production
```

**Important**: Railway automatically sets `DATABASE_URL` - don't override it!

#### Step 5: Configure Build & Start Commands
In Railway settings or `railway.json`:

**Build Command:**
```bash
npm install && npm run build && npm run db:push -- --force
```

**Start Command:**
```bash
npm run start
```

**Or create `railway.json` in root:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build && npm run db:push -- --force"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Note**: After first deployment, seed the database once:
```bash
# In Railway shell/terminal
npx tsx server/seed.ts
```

#### Step 6: Deploy
1. Railway deploys automatically on push
2. Copy your backend URL (e.g., `https://your-app.up.railway.app`)

### Part B: Deploy Frontend to Vercel

#### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

#### Step 2: Update Frontend API Configuration

Before deploying, update `client/src/lib/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
```

#### Step 3: Create `vercel.json` in Root
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Step 4: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

Or connect through Vercel dashboard:
1. Click "Add New Project"
2. Import your GitHub repository
3. Configure build settings

#### Step 5: Configure Environment Variables in Vercel
In Vercel project settings → Environment Variables:

```
VITE_API_URL=https://your-backend.up.railway.app
```

**Important**: The `VITE_` prefix is required for Vite to expose the variable to the browser.

#### Step 6: Redeploy
After adding environment variables, trigger a new deployment.

### Part C: Test Your Deployment
1. Visit your Vercel URL
2. Login with demo account (e.g., admin/admin123)
3. Verify data loads from Railway backend

---

## 🚀 Option 2: Deploy to Vercel (Frontend) + Render (Backend)

Similar to Railway but using Render for backend.

### Part A: Deploy Backend to Render

#### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

#### Step 2: Create PostgreSQL Database
1. Click "New +"
2. Select "PostgreSQL"
3. Choose free tier
4. Name: `crm-database`
5. Copy the "Internal Database URL"

#### Step 3: Create Web Service
1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Configure:

**Name**: `crm-backend`

**Build Command**:
```bash
npm install && npm run build && npm run db:push -- --force
```

**Start Command**:
```bash
npm run start
```

**Note**: After first deployment, seed the database once using the Shell tab:
```bash
npx tsx server/seed.ts
```

#### Step 4: Environment Variables in Render
```
DATABASE_URL=<your-internal-database-url>
SESSION_SECRET=your-super-secret-random-string-here
NODE_ENV=production
PORT=10000
```

#### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment
3. Copy your backend URL (e.g., `https://crm-backend.onrender.com`)

### Part B: Deploy Frontend to Vercel
Follow the same steps as Option 1, Part B, but use your Render backend URL:

```
VITE_API_URL=https://crm-backend.onrender.com
```

---

## 🚀 Option 3: Deploy Everything to Railway

Deploy both frontend and backend on Railway.

#### Step 1: Create Railway Project
1. Create new project from GitHub repo
2. Add PostgreSQL database

#### Step 2: Environment Variables
```
DATABASE_URL=<auto-populated-by-railway>
SESSION_SECRET=your-super-secret-random-string-here
NODE_ENV=production
```

#### Step 3: Configure Build/Start
**Build Command**:
```bash
npm install && npm run build && npm run db:push -- --force
```

**Start Command**:
```bash
npm run start
```

**Note**: After first deployment, seed the database once:
```bash
# In Railway shell/terminal
npx tsx server/seed.ts
```

#### Step 4: Deploy
Railway serves both frontend and backend from the same domain.

---

## 🔧 Troubleshooting

### Issue: "Failed to fetch" errors in browser

**Cause**: Frontend can't reach backend API

**Solutions**:
1. Check `VITE_API_URL` is set correctly in Vercel
2. Verify backend is running (visit backend URL directly)
3. Check CORS settings in `server/index.ts`
4. Ensure backend allows your frontend domain

### Issue: Database connection failed

**Cause**: Invalid `DATABASE_URL`

**Solutions**:
1. Verify `DATABASE_URL` format: `postgresql://user:password@host:port/database`
2. Check database is running
3. For Railway/Render, use the Internal/Private URL not public
4. Test connection: `psql $DATABASE_URL`

### Issue: JWT authentication not working

**Cause**: Missing or mismatched `SESSION_SECRET`

**Solutions**:
1. Ensure `SESSION_SECRET` is set in backend environment
2. Use the same secret across all backend instances
3. Generate secure random string: `openssl rand -base64 32`

### Issue: Build fails on Vercel

**Cause**: Environment variables not available during build

**Solutions**:
1. Ensure all `VITE_*` variables are set in Vercel
2. Check `vercel.json` configuration
3. Verify build command in `package.json`

### Issue: 404 on page refresh in Vercel

**Cause**: SPA routing not configured

**Solution**: Ensure `vercel.json` has rewrite rules (see Option 1, Part B, Step 3)

### Issue: Database tables not created

**Cause**: Schema not pushed

**Solutions**:
```bash
# Locally
npm run db:push

# In Railway/Render build command
npm run db:push -- --force
```

### Issue: No demo data after deployment

**Cause**: Seed script not run

**Solution**: After first deployment, run the seed script once using your platform's shell/terminal:
```bash
npx tsx server/seed.ts
```

**Note**: The seed script is idempotent (safe to run multiple times) - it checks if data exists before inserting.

---

## 📝 Important Notes

### Environment Variables Summary

**Local Development (.env)**:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/crm_db
SESSION_SECRET=your-secret-here
PORT=5000
```

**Backend (Railway/Render)**:
```env
DATABASE_URL=<auto-populated-or-database-url>
SESSION_SECRET=your-secret-here
NODE_ENV=production
```

**Frontend (Vercel)**:
```env
VITE_API_URL=https://your-backend-url.com
```

### Security Checklist
- ✅ Use strong `SESSION_SECRET` (32+ characters)
- ✅ Never commit `.env` file to git
- ✅ Use environment variables for all secrets
- ✅ Enable HTTPS (automatic on Vercel/Railway/Render)
- ✅ Set `NODE_ENV=production` in production

### Cost Estimates (Free Tiers)
- **Vercel**: Free for personal projects
- **Railway**: $5/month free credit (enough for small apps)
- **Render**: Free tier with limitations (spins down after inactivity)
- **Neon/Supabase PostgreSQL**: Free tier available

---

## 🎉 Quick Deploy Commands Reference

### Local Development
```bash
npm install                    # Install dependencies
npm run db:push               # Push schema to database
npx tsx server/seed.ts        # Seed with demo data
npm run dev                   # Start dev server
```

### Production Build
```bash
npm install                   # Install dependencies
npm run build                 # Build frontend + backend
npm run db:push -- --force    # Push schema to production database
npx tsx server/seed.ts        # Seed demo data (one-time)
npm run start                 # Start production server
```

### Database Management
```bash
npm run db:push              # Update database schema
npm run db:push -- --force   # Force update (use carefully)
npx tsx server/seed.ts       # Seed demo data
```

---

## 📞 Need Help?

If you encounter issues:
1. Check the Troubleshooting section above
2. Verify all environment variables are set
3. Check platform-specific logs (Vercel/Railway/Render dashboard)
4. Ensure your database is accessible from your backend

Happy deploying! 🚀
