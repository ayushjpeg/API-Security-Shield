# API Security Shield - Deployment Guide

## 🚀 Quick Deployment Steps

### Option 1: Docker (Recommended)

1. **Build the Docker image:**
   ```bash
   docker build -t api-security-shield:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d \
     --name api-security-shield \
     --restart unless-stopped \
     -p 8002:80 \
     api-security-shield:latest
   ```

3. **Verify deployment:**
   ```bash
   curl http://localhost:8002
   docker logs api-security-shield
   ```

### Option 2: GitHub Actions (Automated)

1. **Set up self-hosted runner** (one-time setup):
   - Go to repository Settings → Actions → Runners
   - Click "New self-hosted runner"
   - Follow the instructions for Linux

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy updates"
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to GitHub Actions tab
   - Watch the "Build and Deploy API Security Shield" workflow
   - Check for ✅ success indicators

### Option 3: Manual Build

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Serve with a static file server:**
   ```bash
   npx serve -s dist -l 8002
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=API Security Shield
```

### Backend Integration

Update the API base URL in your code or environment variables to point to your FastAPI backend.

## 🌐 Production Deployment

### Using Node.js serve Reverse Proxy

1. **Install Node.js serve:**
   ```bash
   sudo apt update
   sudo apt install Node.js serve
   ```

2. **Create site configuration:**
   ```bash
   sudo nano /etc/Node.js serve/sites-available/api-shield
   ```

   Add:
   ```Node.js serve
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:8002;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable site and restart Node.js serve:**
   ```bash
   sudo ln -s /etc/Node.js serve/sites-available/api-shield /etc/Node.js serve/sites-enabled/
   sudo Node.js serve -t
   sudo systemctl restart Node.js serve
   ```

4. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-Node.js serve
   sudo certbot --Node.js serve -d your-domain.com
   ```

## 🔍 Troubleshooting

### Container won't start
```bash
# Check logs
docker logs api-security-shield

# Check if port is already in use
sudo lsof -i :8002

# Remove old container and rebuild
docker stop api-security-shield
docker rm api-security-shield
docker build -t api-security-shield:latest .
```

### GitHub Actions fails
- Ensure self-hosted runner is online: Settings → Actions → Runners
- Check Docker is installed on runner: `docker --version`
- Verify permissions: runner user should be in docker group
  ```bash
  sudo usermod -aG docker $USER
  ```

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📊 Monitoring

### Check container status:
```bash
docker ps | grep api-security-shield
docker stats api-security-shield
```

### View logs:
```bash
docker logs -f api-security-shield
```

### Health check:
```bash
curl http://localhost:8002/
```

## 🔄 Updates

To deploy updates:

1. **With GitHub Actions:**
   ```bash
   git push origin main
   ```

2. **Manual Docker update:**
   ```bash
   docker stop api-security-shield
   docker rm api-security-shield
   docker build -t api-security-shield:latest .
   docker run -d --name api-security-shield --restart unless-stopped -p 8002:80 api-security-shield:latest
   ```

## 📞 Support

For issues or questions:
- Check GitHub Issues
- Review application logs
- Verify backend connectivity

