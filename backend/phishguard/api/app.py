# Force reload: Map Added
from fastapi import FastAPI, BackgroundTasks, Depends, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from phishguard.core.config import settings
from phishguard.core.database import db
from phishguard.detection.classify import PhishDetector
from phishguard.api.security import get_api_key
import os
import datetime
import logging
import sys

# Configure Structured Logging
logging.basicConfig(
    level=logging.INFO,
    format='{"timestamp": "%(asctime)s", "level": "%(levelname)s", "service": "phishguard", "message": "%(message)s"}',
    datefmt='%Y-%m-%dT%H:%M:%S%z',
    stream=sys.stdout
)
logger = logging.getLogger("phishguard")

app = FastAPI(title=settings.APP_NAME, version=settings.VERSION)

# Static Assets Configuration
if os.environ.get("PRODUCTION") == "true":
    static_dir = "/app/static_web"
else:
    static_dir = os.path.join(os.path.dirname(__file__), "../../../frontend-v2/dist")

from phishguard.detection.email_scanner import EmailScanner

# Initialize Engines
try:
    detector = PhishDetector()
    email_scanner = EmailScanner()
    logger.info("Detection engines initialized successfully.")
except Exception as e:
    logger.critical(f"Failed to initialize detection engines: {e}")
    sys.exit(1)

# --- Endpoint Models ---
from pydantic import BaseModel

class ScanRequest(BaseModel):
    url: str

class EmailScanRequest(BaseModel):
    raw_content: str

@app.on_event("startup")
def startup_db_client():
    try:
        db.connect()
        logger.info(f"Connected to Database: {settings.MONGO_DB_NAME}")
    except Exception as e:
        logger.error(f"Database connection failed: {e}")

@app.on_event("shutdown")
def shutdown_db_client():
    db.close()
    logger.info("Database connection closed.")

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/scan/url")
async def scan_url(
    request: ScanRequest, 
    background_tasks: BackgroundTasks,
    api_key: str = Depends(get_api_key)
):
    logger.info(f"Scanning URL: {request.url}")
    result = detector.scan_url(request.url)
    
    # Add timestamp and save to DB
    scan_record = result.copy()
    scan_record["timestamp"] = datetime.datetime.utcnow()
    
    # Save asynchronously
    background_tasks.add_task(save_scan_result, scan_record)
    
    return result

@app.post("/scan/email")
async def scan_email(request: EmailScanRequest, api_key: str = Depends(get_api_key)):
    """
    Analyzes raw email content for headers, keywords, and malicious links.
    """
    logger.info("Processing email scan request.")
    result = email_scanner.scan_email(request.raw_content)
    return result

@app.get("/scans/history")
async def get_history(limit: int = 20):
    if db.db is None:
        return []
    
    cursor = db.db.scans.find().sort("timestamp", -1).limit(limit)
    scans = await cursor.to_list(length=limit)
    
    # Serialize ObjectId to string for JSON compatibility
    for scan in scans:
        if "_id" in scan:
            scan["_id"] = str(scan["_id"])
            
    return scans


# Helper function for async saving (defined here to avoid circular imports)
from phishguard.detection.image_scanner import ImageScanner
from fastapi import UploadFile, File

# Initialize Image Scanner
image_scanner = ImageScanner()

# ... existing code ...

@app.post("/scan/image")
async def scan_image(
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = None, 
    api_key: str = Depends(get_api_key)
):
    logger.info(f"Scanning image: {file.filename}")
    contents = await file.read()
    result = image_scanner.scan_image(contents, file.filename)
    
    # Optional: Log image scans to DB (omitted for MVP or added purely as log)
    # if background_tasks:
    #    background_tasks.add_task(log_image_scan, result)
        
    return result

@app.get("/stats/map")
async def get_map_stats():
    """
    Returns a list of recent threat locations (Mocked for demo purposes).
    In a real app, this would query IP geolocation from the DB.
    """
    import random
    
    # Mock Data Generation
    # Generating 50 random points focused around rough coordinates of major tech hubs
    # to simulate "attacks"
    
    locations = []
    
    # Hubs: (Lat, Lng, Variance)
    hubs = [
        (37.7749, -122.4194, 10), # SF/Silicon Valley
        (40.7128, -74.0060, 5),   # NYC
        (51.5074, -0.1278, 5),    # London
        (35.6762, 139.6503, 5),   # Tokyo
        (22.3193, 114.1694, 2),   # Hong Kong
        (55.7558, 37.6173, 10),   # Moscow
        (-33.8688, 151.2093, 5)   # Sydney
    ]
    
    for _ in range(30):
        hub = random.choice(hubs)
        lat = hub[0] + random.uniform(-hub[2], hub[2])
        lng = hub[1] + random.uniform(-hub[2], hub[2])
        
        locations.append({
            "lat": lat,
            "lng": lng,
            "type": "PHISHING" if random.random() > 0.2 else "LEGITIMATE",
            "timestamp": datetime.datetime.utcnow().isoformat()
        })
        
    return locations

async def save_scan_result(record: dict):
    if db.db is not None:
        try:
            await db.db.scans.insert_one(record)
        except Exception as e:
            logger.error(f"Failed to save scan record: {e}")

@app.on_event("startup")
async def startup_diagnostic():
    logger.info("--- PRODUCTION DIAGNOSTIC START ---")
    logger.info(f"CWD: {os.getcwd()}")
    logger.info(f"Environment PRODUCTION: {os.environ.get('PRODUCTION')}")
    logger.info(f"Target static_dir: {static_dir}")
    
    if os.path.exists(static_dir):
        logger.info(f"SUCCESS: {static_dir} exists")
        try:
            for root, dirs, files in os.walk(static_dir):
                level = root.replace(static_dir, '').count(os.sep)
                indent = ' ' * 4 * (level)
                logger.info(f"{indent}{os.path.basename(root)}/")
                subindent = ' ' * 4 * (level + 1)
                for f in files:
                    logger.info(f"{subindent}{f}")
        except Exception as e:
            logger.error(f"Error walking static_dir: {e}")
    else:
        logger.error(f"CRITICAL: {static_dir} does not exist!")
    
    logger.info("--- PRODUCTION DIAGNOSTIC END ---")

@app.get("/health")
def health_check():
    return {"status": "healthy", "static_dir_exists": os.path.exists(static_dir)}

# --- SPA Serving & Routing ---
# API routes are already defined above. 
# This catch-all handles files, the root, and SPA navigation.

@app.get("/{rest_of_path:path}")
async def serve_spa(request: Request, rest_of_path: str):
    # 1. Handle root
    if not rest_of_path:
        index_path = os.path.join(static_dir, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
        return {"error": "index.html not found"}

    # 2. Check if it's a direct file request (assets, images, robots.txt etc)
    # Important: Vite assets are in /assets/... 
    file_path = os.path.join(static_dir, rest_of_path)
    if os.path.isfile(file_path):
        return FileResponse(file_path)

    # 3. SPA Fallback: If not a file, and expects HTML, serve index.html
    # This allows browser-side routing to work.
    if "text/html" in request.headers.get("accept", ""):
        index_path = os.path.join(static_dir, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
    
    # 4. Final Fallback: 404
    return {"detail": "Not Found", "requested": rest_of_path}
