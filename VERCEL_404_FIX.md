# Fixing 404 Error on Vercel Deployment

## Common Causes & Solutions

### 1. **Environment Variables Not Set** ⚠️ (Most Common)

**Problem**: If environment variables are missing, the build might fail or routes won't load.

**Solution**: 
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add ALL required variables:
   ```
   SUPABASE_PROJECT_URL
   SUPABASE_API_KEY
   SUPABASE_SERVICE_ROLE_KEY
   SUPABASE_DATABASE_URL (optional)
   ADMIN_EMAIL
   ADMIN_PASSWORD
   ```
3. **Redeploy** after adding variables

### 2. **Build Output Issue**

**Problem**: Build might be failing silently.

**Solution**:
1. Check Vercel deployment logs
2. Look for build errors
3. Test build locally: `npm run build`
4. Ensure build completes successfully

### 3. **Vercel Configuration**

**Problem**: `vercel.json` might be interfering with auto-detection.

**Solution**: 
- The `vercel.json` has been simplified
- React Router Vercel preset should handle routing automatically
- If still failing, try removing `vercel.json` entirely

### 4. **Route Configuration**

**Problem**: Routes not being recognized.

**Solution**: 
- Verify `app/routes.ts` has all routes
- Ensure `react-router.config.ts` has `vercelPreset()`
- Check that index route exists

### 5. **Node.js Version**

**Problem**: Wrong Node.js version.

**Solution**:
1. Vercel Dashboard → Settings → General
2. Set Node.js Version to **20.x** or **22.x**
3. Or ensure `package.json` has `"engines": { "node": ">=20.0.0" }`

---

## Step-by-Step Fix

### Step 1: Check Build Logs
1. Go to Vercel Dashboard
2. Click on your deployment
3. Check "Build Logs" tab
4. Look for errors or warnings

### Step 2: Verify Environment Variables
1. Settings → Environment Variables
2. Ensure all variables are set for **Production** environment
3. Check that values are correct (no extra spaces)

### Step 3: Test Build Locally
```bash
npm run build
```
If this fails, fix errors before deploying.

### Step 4: Redeploy
1. Push latest code to GitHub
2. Or trigger redeploy in Vercel dashboard
3. Wait for build to complete

### Step 5: Check Function Logs
1. Vercel Dashboard → Your Project → Functions
2. Check runtime logs for errors
3. Look for database connection issues

---

## Quick Fixes to Try

### Fix 1: Remove vercel.json (Let Auto-Detect)
```bash
# Delete vercel.json and let Vercel auto-detect React Router
```

### Fix 2: Update vercel.json
The current `vercel.json` is minimal and should work. If issues persist, try removing it.

### Fix 3: Check Route Access
- Try accessing root: `https://your-project.vercel.app/`
- Try accessing a route: `https://your-project.vercel.app/about`
- Check if API routes work: `https://your-project.vercel.app/api/products`

### Fix 4: Verify Supabase Connection
- Ensure Supabase project is active
- Check API keys are correct
- Verify database tables exist

---

## Debugging Commands

### Test Build Locally
```bash
npm run build
npm run start
# Visit http://localhost:5000
```

### Check Environment Variables
```bash
npm run check-env
```

### Test Supabase Connection
```bash
npm run test-supabase
```

---

## Expected Behavior

After fixing:
- ✅ Root route (`/`) should load
- ✅ All page routes should work (`/about`, `/contact`, etc.)
- ✅ API routes should respond (`/api/products`, etc.)
- ✅ Admin routes should work (`/admin/login`, `/admin/dashboard`)

---

## Still Not Working?

1. **Check Vercel Function Logs**: Look for runtime errors
2. **Verify Build Output**: Ensure `build/` directory has correct structure
3. **Test API Endpoints**: Check if `/api/products` returns data
4. **Check Network Tab**: Look for failed requests in browser dev tools
5. **Review Deployment Logs**: Check for any warnings or errors

---

## Contact Support

If none of these work:
1. Share Vercel deployment logs
2. Share build output
3. Share function runtime logs
4. Share environment variable names (not values)

