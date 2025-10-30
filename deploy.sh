#!/bin/bash

# Deployment script for reptrack-frontend
# This script will be executed on the EC2 server after code is pulled

set -e  # Exit on error

echo "🚀 Starting frontend deployment..."

# Navigate to project directory
cd /home/ubuntu/reptrack-frontend

# Pull latest changes from GitHub
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the frontend
echo "🏗️  Building frontend..."
npm run build

# Reload nginx to serve the new build
echo "🔄 Reloading nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Frontend deployment completed successfully!"
echo "📊 Nginx status:"
sudo systemctl status nginx --no-pager -l
