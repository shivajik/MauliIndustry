# Vercel 404 Error - Troubleshooting Guide

## 🔴 Issue: 404 NOT FOUND after deployment

The error shows: `404: NOT FOUND` with code `NOT_FOUND` on Vercel.

---

## ✅ Most Likely Causes & Fixes

### 1. **Missing Environment Variables** (90% of cases)

**Symptoms**: 
- 404 on all routes
- Build succeeds but routes don't work
- API endpoints return errors

**Fix**:
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add these variables for **Production**, **Preview**, and **Development**:

```env
SUPABASE_PROJECT_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SUPABASE_DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:6543/postgres
ADMIN_EMAIL=admin@mauliindustries.co.in
ADMIN_PASSWORD=your-secure-password
```

3. **Redeploy** after adding variables (Vercel Dashboard → Deployments → Click "..." → Redeploy)

---

### 2. **Build Configuration**

**Symptoms**: Build fails or incomplete

**Fix**:
1. Check **Build Logs** in Vercel Dashboard
2. Ensure build command is: `npm run build`
3. Verify Node.js version is **20.x** or **22.x**

**In Vercel Dashboard**:
- Settings → General → Node.js Version → Select **20.x**

---

### 3. **Framework Detection**

**Symptoms**: Vercel not recognizing React Router

**Fix**:
- ✅ **Removed `vercel.json`** - Let Vercel auto-detect React Router
- The `@vercel/react-router` preset in `react-router.config.ts` handles everything
- Vercel should auto-detect React Router framework

**If auto-detection fails**:
1. In Vercel Dashboard → Settings → General
2. Framework Preset: Select **"Other"** or **"React Router"** (if available)
3. Build Command: `npm run build`
4. Output Directory: Leave empty (auto-detected)

---

### 4. **Route Access**

**Test these URLs**:
- Root: `https://your-project.vercel.app/`
- About: `https://your-project.vercel.app/about`
- API: `https://your-project.vercel.app/api/products`

**If root works but others don't**: Route configuration issue
**If nothing works**: Environment variables or build issue

---

## 🔧 Step-by-Step Fix Process

### Step 1: Verify Local Build
```bash
npm run build
npm run start
# Visit http://localhost:5000 - should work
```

### Step 2: Check Environment Variables
```bash
npm run check-env
# Should show all variables are set
```

### Step 3: Verify Vercel Settings
1. **Framework**: Should be "React Router" or "Other"
2. **Build Command**: `npm run build`
3. **Output Directory**: Empty (auto)
4. **Install Command**: `npm install`
5. **Node.js Version**: 20.x or 22.x

### Step 4: Add Environment Variables in Vercel
1. Dashboard → Project → Settings → Environment Variables
2. Add all required variables
3. **Important**: Add to **Production**, **Preview**, AND **Development**

### Step 5: Redeploy
1. Push latest code: `git push origin main`
2. Or manually redeploy in Vercel Dashboard

---

## 🐛 Debugging

### Check Build Logs
1. Vercel Dashboard → Your Deployment
2. Click "Build Logs" tab
3. Look for errors or warnings

### Check Function Logs
1. Vercel Dashboard → Your Project → Functions
2. Click on a function
3. Check "Logs" tab for runtime errors

### Test API Endpoints
```bash
# Test if API works
curl https://your-project.vercel.app/api/products
```

### Check Network Tab
1. Open browser DevTools → Network tab
2. Visit your Vercel URL
3. Look for failed requests (red)
4. Check response status codes

---

## ✅ Verification Checklist

After fixes, verify:
- [ ] Root route (`/`) loads
- [ ] About page (`/about`) loads
- [ ] Products page (`/products-services`) loads
- [ ] API endpoint (`/api/products`) returns data
- [ ] Admin login (`/admin/login`) loads
- [ ] No console errors in browser
- [ ] No errors in Vercel function logs

---

## 🚨 Common Mistakes

1. **Environment variables only in Development**: Must add to Production too!
2. **Wrong Supabase keys**: Using anon key where service role needed
3. **Missing database URL**: If using PostgreSQL fallback
4. **Node.js version mismatch**: Using wrong Node version
5. **Build output directory**: Should be auto-detected, don't set manually

---

## 📞 Still Not Working?

Share these details:
1. Vercel build logs (screenshot)
2. Vercel function logs (screenshot)
3. Browser console errors (screenshot)
4. Network tab (screenshot)
5. Environment variable names (not values!)

---

## 🎯 Quick Fix Summary

1. ✅ **Removed `vercel.json`** - Let Vercel auto-detect
2. ✅ **Add environment variables** in Vercel Dashboard
3. ✅ **Set Node.js to 20.x** in Vercel settings
4. ✅ **Redeploy** after changes
5. ✅ **Test routes** one by one

The most common issue is **missing environment variables**. Add them and redeploy!

