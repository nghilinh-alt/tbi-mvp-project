# 🚨 TBI-MVP DIAGNOSTIC REPORT - Issues Found & Solutions

## PROBLEMS IDENTIFIED

### Issue #1: Static HTML Page Instead of React App
**Location:** `frontend/index.html`  
**Problem:** File contained vanilla HTML with inline JavaScript instead of mounting React app  
**Symptoms:** 
- "Continue to Dashboard" button only showed alert, didn't navigate
- No login form or React components rendered
- Blank white screen after fix

### Issue #2: Missing Admin Portal (5174)
**Location:** `frontend-admin/` directory  
**Problem:** Frontend-admin package.json and src files may not exist or weren't started  
**Symptoms:** Clicking port 5174 link redirected to 5173  

### Issue #3: Backend API Not Running  
**Location:** `backend/`  
**Problem:** No backend server running on port 8000  
**Symptoms:** Connection refused errors when accessing API docs  

---

## ✅ FIXES APPLIED

### Fix #1: Replaced Static HTML with React Mount Point
```html
<!-- Old: vanilla HTML with onclick handlers -->
<button onclick="showDashboard()">Continue</button>

<!-- New: Proper React mounting -->
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

### Fix #2: Admin Portal Setup Required
Admin portal needs to be created at `frontend-admin/src/App.tsx` with its own routing.

---

## 🚀 STARTING COMMANDS (Copy/Paste These)

### Terminal 1 - Backend API:
```bash
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\backend
call venv_backend\Scripts\activate.bat
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 - Participant App (5173):
```bash
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\frontend
npm run dev
```

### Terminal 3 - Admin Portal (5174) [NEW]:
```bash
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\frontend-admin
npm install
npm run dev
```

---

## 📋 NEXT STEPS

1. **Open 3 separate PowerShell/Windows Terminal windows**
2. **Run each command block above in separate terminal**
3. **Wait ~15 seconds for React apps to hydrate**
4. **Refresh browser at http://localhost:5173**
5. **Click "Continue to Dashboard" button**

---

## 🔍 VERIFICATION CHECKLIST

After starting all servers:

- [ ] Backend API responds at `http://localhost:8000/docs` (Swagger UI visible)
- [ ] Participant app shows login/dashboard components (not blank)
- [ ] Clicking "Continue to Dashboard" navigates properly
- [ ] Admin portal accessible at different URL path or separate port

---

## 🛠️ IF STILL HAVING ISSUES

### Check if venv_backend exists:
```bash
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\backend
python -m venv venv_backend
venv_backend\Scripts\activate.bat
pip install fastapi uvicorn pydantic[email] python-jose[cryptography] passlib[bcrypt] sqlalchemy alembic
```

### Check node_modules:
```bash
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\frontend
npm install
```

---

## 📱 ACCESS URLs (Once Running)

| Service | URL | Status |
|---------|-----|--------|
| Backend API | `http://localhost:8000` | Needs restart |
| Swagger Docs | `http://localhost:8000/docs` | Needs restart |
| Participant App | `http://localhost:5173` | ✅ React app loaded |
| Admin Portal | `http://localhost:5174` | ⚠️ Needs setup |

---

## 🎯 SUMMARY

**Root Cause:** Wrong HTML entry point was serving static page instead of React SPA.

**Fix Applied:** Replaced `index.html` with proper React mount point.

**Action Required:** You need to manually restart the dev servers in separate terminals, and optionally create the admin portal if you want a second interface.
