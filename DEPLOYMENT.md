# Frontend Deployment Guide

## 🚀 Automatic Deployment (CI/CD)

Every push to `main` branch automatically deploys to EC2 server.

### Prerequisites

1. **EC2 Server Setup**
   - Ubuntu server with Node.js and Nginx installed
   - Frontend code cloned to: `/home/ubuntu/reptrack-frontend`
   - Nginx serves from: `/home/ubuntu/reptrack-frontend/dist`

2. **GitHub Repository Secrets**

   Go to: **Repository → Settings → Secrets and variables → Actions**

   Add these secrets:

   | Secret Name | Value | Description |
   |------------|-------|-------------|
   | `EC2_HOST` | `13.221.184.255` | EC2 server IP address |
   | `EC2_USERNAME` | `ubuntu` | SSH username |
   | `EC2_SSH_KEY` | Private SSH key | Full SSH private key (including BEGIN/END lines) |

3. **SSH Key Setup**

   Add your public SSH key to EC2:
   ```bash
   # On EC2 server
   echo "your-public-key" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

---

## 📋 Deployment Process

### Automatic (Recommended)
```bash
git add .
git commit -m "your changes"
git push origin main
```
✅ GitHub Actions will automatically:
- SSH into EC2 server
- Pull latest code
- Install dependencies
- Build production bundle (`npm run build`)
- Reload Nginx

### Manual Deployment
```bash
# SSH into server
ssh -i your-key.pem ubuntu@13.221.184.255

# Navigate to project
cd /home/ubuntu/reptrack-frontend

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build for production
npm run build

# Reload Nginx
sudo nginx -t && sudo systemctl reload nginx
```

---

## 🔍 Monitoring

**Check Deployment Status:**
- GitHub Actions: https://github.com/GriffonWS/reptrack-frontend/actions

**Check Server Status:**
```bash
# Test Nginx
sudo nginx -t

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/error.log

# Test frontend
curl -I http://13.221.184.255
```

---

## 🌐 Access

**Frontend URL:** http://13.221.184.255
**Port:** 80 (HTTP)

---

## ⚠️ Important Notes

- **`.env` file**: Not tracked in git. Manage separately on server.
- **Build Tool**: Uses Vite for building
- **Web Server**: Nginx serves static files from `dist` folder
- **Node Version Warning**: Vite prefers Node.js v20+, currently using v18.20.8 (still works)
- **Build Output**: Located at `/home/ubuntu/reptrack-frontend/dist`

---

## 🐛 Troubleshooting

**Deployment failed?**
1. Check GitHub Actions logs
2. Verify SSH key is correct
3. Ensure all secrets are set in GitHub
4. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

**Changes not showing?**
1. Clear browser cache (Ctrl + Shift + R)
2. Check if build succeeded: `ls -la /home/ubuntu/reptrack-frontend/dist`
3. Verify Nginx is serving correct directory: `sudo nginx -t`

**Can't access frontend?**
1. Verify security group allows HTTP (port 80)
2. Check EC2 instance is running
3. Verify Nginx is running: `sudo systemctl status nginx`
4. Check Nginx configuration: `cat /etc/nginx/sites-available/reptrack`
