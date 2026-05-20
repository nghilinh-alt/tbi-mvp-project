# 🚀 TBI-MVP Quick Start Guide

## 📋 Prerequisites

Before running, ensure you have:
- ✅ Python 3.8+ installed
- ✅ pip (Python package manager)
- ✅ Node.js installed
- ✅ npm (Node package manager)

---

## 🎯 Quick Start

### **Option 1: Auto-Start Script** (RECOMMENDED)

Run this once in PowerShell or Command Prompt:

```powershell
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project
start.bat
```

This will automatically:
1. Check if backend virtual environment exists (creates it if missing)
2. Check if frontend dependencies are installed (installs if missing)
3. Opens 2 new terminal windows - one for Backend, one for Frontend
4. Wait for both to start before showing startup info

---

### **Option 2: Manual Start** (Two Terminal Windows)

#### Terminal Window 1 - Backend API:
```powershell
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\backend
.\venv_backend\Scripts\activate.bat
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Terminal Window 2 - Frontend App:
```powershell
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\frontend
npm run dev
```

---

## 🌐 Access Points

After starting:
- **Frontend:** http://localhost:5173
- **Backend API Docs:** http://localhost:8000/docs

---

## 🛑 Stop the App

To stop, close both terminal windows or press `Ctrl+C` in each.

---

## ⚙️ First-Time Setup (Run Once)

If you haven't run this yet, execute these commands once:

```powershell
# Create backend virtual environment
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\backend
python -m venv venv_backend
.\venv_backend\Scripts\activate.bat
pip install -r requirements.txt
deactivate

# Install frontend dependencies (only if missing)
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\frontend
npm install
```

---

## 🐛 Troubleshooting

### Backend won't start:
```powershell
# Recreate backend venv
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\backend
rmdir /s /q venv_backend
python -m venv venv_backend
.\venv_backend\Scripts\activate.bat
pip install -r requirements.txt
```

### Frontend shows blank page:
```powershell
# Install Tailwind and dependencies
cd C:\Users\nghil\Projects\Hermes\tbi-mvp-project\frontend
npm install tailwindcss@latest @tailwindcss/cli autoprefixer
```

---

## 📂 Project Structure

```
tbi-mvp-project/
├── backend/                 # Python API server
│   ├── venv_backend/       # Virtual environment (creates first time)
│   ├── requirements.txt    # Python dependencies
│   └── app/
├── frontend/               # React application
│   ├── node_modules/       # Frontend dependencies (installs once)
│   ├── src/                # React components
│   └── package.json        # Frontend config
├── start.bat              # Auto-start script
└── README.md             # This file
```

---

## 🎨 Tech Stack Used

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4 (photophobia-friendly dark theme)
- **Backend:** Python with FastAPI/Uvicorn
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide Icons

---

**Created:** TBI Employment Pathways MVP  
**Location:** `C:\Users\nghil\Projects\Hermes\tbi-mvp-project`
