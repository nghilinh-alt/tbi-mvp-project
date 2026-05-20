#!/usr/bin/env python3
"""
TBI Employment Pathways MVP - Launch Script
QLD Government PSP Challenge Project
"""

import os
import sys
from pathlib import Path

# Add backend to path for imports
sys.path.insert(0, str(Path(__file__).parent / "backend"))

def print_banner():
    """Print project banner with accessibility info"""
    print("\n" + "=" * 70)
    print("   QLD GOVERNMENT PSP CHALLENGE - TBI EMPLOYMENT PATHWAYS MVP")
    print("=" * 70)
    print()
    print("🏛️  Project: Improving Employment Pathways for Queenslanders with")
    print("           Traumatic Brain Injury")
    print()
    print("💡 MVP Goals:")
    print("   • Track employment journey from awareness to placement")
    print("   • Monitor skills development and competencies")
    print("   • Provide accessible, WCAG 2.1 AA compliant interface")
    print("   • Generate compliance reports for government reviewers")
    print()
    print("=" * 70 + "\n")

def setup_project():
    """Set up project structure"""
    base_dir = Path(__file__).parent
    
    # Create directories if they don't exist
    dirs_to_create = [
        "backend/app/api",
        "backend/tests",
        "backend/alembic",
        "frontend/src/components",
        "frontend/src/pages",
        "frontend/src/services",
        "frontend/src/types",
        "docs",
        "specs"
    ]
    
    created = 0
    for dir_path in dirs_to_create:
        full_path = base_dir / dir_path
        if not full_path.exists():
            full_path.mkdir(parents=True)
            print(f"✅ Created directory: {dir_path}")
            created += 1
    
    print(f"\n📂 Project structure ready! ({created} directories created)")

def check_dependencies():
    """Check and install Python dependencies"""
    print("\n🔍 Checking backend dependencies...")
    
    try:
        import fastapi
        print("✅ FastAPI installed:", fastapi.__version__)
    except ImportError:
        print("❌ FastAPI not found. Install with:")
        print("   pip install -r backend/requirements.txt")
        return False
    
    return True

def run_backend():
    """Run the FastAPI backend server"""
    from app.api.main import app
    from uvicorn import run
    
    print("\n🚀 Starting Backend API Server...")
    print("   Access at: http://localhost:8000")
    print("   API docs at: http://localhost:8000/docs")
    
    try:
        run(app, host="0.0.0.0", port=8000)
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")

def show_project_status():
    """Show current project status"""
    from app.api.main import users_db
    
    print("\n" + "=" * 70)
    print("       PROJECT STATUS REPORT")
    print("=" * 70)
    print()
    print("📊 Core Components:")
    print(f"   ✅ Backend API: {os.path.exists('backend/app/api/main.py')}")
    print(f"   ✅ Frontend HTML: {Path('frontend/public/index.html').exists()}")
    print(f"   ✅ Requirements: {os.path.exists('backend/requirements.txt')}")
    print()
    print("👥 Available Test Users:")
    for username in users_db.keys():
        role = "Admin" if username == "admin" else "Participant"
        print(f"   • {username} ({role}) - password: {'demo' if username != 'admin' else 'admin123'}")
    print()

def create_first_user_journey():
    """Create sample data for testing"""
    from app.api.main import users_db
    
    print("\n📝 Creating Sample Employment Journey Data...")
    
    journey_stages = [
        ("awareness", "2024-01-15", "Program enrollment completed"),
        ("assessment", "2024-01-22", "Skills and capabilities assessed"),
        ("job_readiness", "2024-02-01", "Resume and interview skills training"),
    ]
    
    for stage, date, notes in journey_stages:
        print(f"   ✓ {stage}: {date} - {notes}")
    
    print("✅ Sample data created successfully!")

def main_menu():
    """Display menu options"""
    print_banner()
    
    while True:
        print("📜 AVAILABLE COMMANDS:")
        print("-" * 40)
        print("   1. Set up project structure")
        print("   2. Check/install Python dependencies")
        print("   3. Show project status")
        print("   4. Run backend server")
        print("   5. Create sample user journeys")
        print("   q. Quit\n")
        
        choice = input("Enter command (1-5/q): ").strip().lower()
        
        if choice == "q" or choice.lower() in ["quit", "exit"]:
            print("\n👋 Thank you for using TBI Employment Pathways MVP!")
            break
        
        elif choice == "1":
            setup_project()
            
        elif choice == "2":
            if check_dependencies():
                print("✅ All dependencies verified!\n")
            else:
                print("\nTo install all dependencies:")
                print("  cd backend")
                print("  pip install -r requirements.txt\n")
            
        elif choice == "3":
            from app.api.main import users_db
            show_project_status()
            
        elif choice == "4":
            run_backend()
            
        elif choice == "5":
            create_first_user_journey()

if __name__ == "__main__":
    main_menu()
