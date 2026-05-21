# 🚀 TBI-MVP STARTUP COMMANDS FOR WINDOWS TERMINAL/POWERSHELL

## 1️⃣ BACKEND API (Terminal 1):
```powershell
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\backend
.\venv_backend\Scripts\activate.bat
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## 2️⃣ PARTICIPANT APP (Terminal 2):
```powershell
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\frontend
npm run dev
```

---

## 3️⃣ ADMIN PORTAL (Terminal 3) - OPTIONAL:
```powershell
# If you want separate admin UI, create it first:
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project
mkdir frontend-admin

cd frontend-admin
npm create vite@latest . -- --template react-ts
npm install
npm run dev
```

---

## 📋 ALTERNATIVE: Use batch script instead:

Create `C:\Users\nghil\Projects\Hermes\tbi-mvp-project\start-all.bat`:
```batch
@echo off
echo Starting TBI-MVP Application...
cd /d "%~dp0backend"
call venv_backend\Scripts\activate.bat
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

echo Backend started. Press Ctrl+C to stop.
pause
```

Then run `start-all.bat` in ONE terminal window and open separate terminals for frontend apps.
