# --- Stage 1: Build React Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /build
COPY frontend-v2/package*.json ./
RUN npm ci
COPY frontend-v2/ .
RUN npm run build

# --- Stage 2: Final Backend Image ---
FROM python:3.9-slim-bullseye

# Set working directory
WORKDIR /app

# Install system dependencies required for OpenCV
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements from backend directory
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy compiled frontend from Stage 1
# Point to a standard internal path for static assets
COPY --from=frontend-builder /build/dist /app/static_web

# Copy models directory if it exists
COPY models* /app/models/

# Expose port
EXPOSE 8000

# Run the application
# We'll set an environment variable to help the app find its static files
ENV PRODUCTION=true
# Finalizing build
CMD ["uvicorn", "phishguard.api.app:app", "--host", "0.0.0.0", "--port", "8000"]
