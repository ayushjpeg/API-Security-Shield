# API Security Shield

## Overview

**Problem:** APIs play a critical role in modern enterprises but are increasingly vulnerable to security threats. There is a growing need for a comprehensive solution to manage and protect APIs throughout the Software Development Life Cycle (SDLC).

**Proposed Solution:** API Security Shield is a scalable solution that integrates seamlessly into the SDLC. It offers API inventory management, real-time monitoring, and protection against OWASP Top 10 API security risks, all managed through a centralized dashboard.

**Main Objectives:**
- API Inventory Management
- OWASP Top 10 Protection
- Centralized Dashboard

**Expected Impact:**
- Enhanced Security
- Improved Efficiency
- Scalability

---

## Algorithm / Logic

### API Security Check Logic
Endpoints perform security checks against OWASP Top 10 risks.

### Real-Time Monitoring
- Pub/Sub setup for publishing and subscribing to security alerts.
- Alerts are displayed on the dashboard in real-time.

### OAuth2 Authorization
- OAuth2 with JWT ensures secure access by validating tokens.

### Dashboard Logic
- Fetch API data, issue reports, and security check results via FastAPI endpoints.
- Enables user interaction and centralized API security management.

---

## Methodology

### Planning & Requirements:
- Identified API inventory, monitoring, and security needs.
- Aligned design with OWASP Top 10 API security risks.

### Backend with FastAPI:
- Built secure, scalable API endpoints.
- Integrated OAuth2 with JWT for authentication.

### Frontend with React:
- Developed an interactive API management dashboard.
- Enabled seamless backend integration using Axios.

### Real-Time Monitoring:
- Configured Pub/Sub for real-time API activity alerts.

### CI/CD Pipeline:
- Designed GitHub Actions workflows for continuous integration and deployment.
- Automated testing, deployment, and security checks.

---

## Tools and Technologies

- **Backend:** FastAPI
- **Frontend:** React with Axios
- **Authentication:** OAuth2 with JWT
- **Real-Time Monitoring:** Pub/Sub (Google Cloud Platform)
- **Containerization:** Docker
- **CI/CD Integration:** GitHub Actions

---

## Setup Instructions

1. **Clone the Repositories:**
   - Clone the frontend repository:
     ```bash
     git clone https://github.com/username/api-security-shield.git
     cd api-security-shield
     ```
   - The backend repository can be found here: [API Security Shield Backend](https://github.com/ayushjpeg/API-Security-Shield-backend)

2. **Set Up Frontend:**
   - Navigate to the frontend directory:
     ```bash
     cd api-security-shield
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React application:
     ```bash
     npm start
     ```

3. **Configure Pub/Sub:**
   - Set up Google Cloud credentials for Pub/Sub.
   - Ensure Pub/Sub topics and subscriptions are properly configured.

4. **Dockerize the Application:**
   - Build and run the Docker containers:
     ```bash
     docker-compose up --build
     ```

5. **Configure CI/CD:**
   - Ensure GitHub Actions workflows are correctly set up in `.github/workflows/`.

---

## Features

- **API Security Checks:** Proactive scans for OWASP Top 10 risks.
- **Real-Time Alerts:** Immediate notifications for suspicious activities.
- **Centralized Dashboard:** Unified interface for monitoring and managing APIs.
- **Secure Authentication:** OAuth2 with JWT for access control.
- **CI/CD Integration:** Automated testing and deployment for continuous reliability.

---

## 🐳 Docker Deployment

### Build and Run Locally

```bash
cd API-Security-Shield
docker build -t api-security-shield:latest .
docker run -d \
  --name api-security-shield \
  --restart unless-stopped \
  -p 8002:80 \
  api-security-shield:latest
```

Access the application at `http://localhost:8002`

### Using Docker Compose (Optional)

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build: .
    container_name: api-security-shield
    restart: unless-stopped
    ports:
      - "8002:80"
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 5s
```

Run with:
```bash
docker-compose up -d
```

---

## ⚙️ GitHub Actions CI/CD Setup

### 1. Set Up Self-Hosted Runner

On your Ubuntu server:

```bash
# Create a folder for the runner
mkdir actions-runner && cd actions-runner

# Download the latest runner package
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz

# Extract the installer
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Configure the runner
./config.sh --url https://github.com/YOUR_USERNAME/API-Security-Shield --token YOUR_TOKEN

# Install and start the runner as a service
sudo ./svc.sh install
sudo ./svc.sh start
```

### 2. Configure Repository Settings

1. Go to your repository **Settings → Actions → Runners**
2. Add the self-hosted runner with label `linux`
3. Ensure Docker is installed on the runner machine

### 3. Deploy

Push to `main` branch or manually trigger the workflow:
- GitHub Actions will automatically build and deploy
- The workflow includes health checks and verification
- Old containers are cleaned up automatically
- Application runs on port 8002

### 4. Nginx Reverse Proxy (Production)

For HTTPS in production, set up nginx on your host:

```nginx
server {
    listen 80;
    server_name api-shield.yourdomain.com;

    location / {
        proxy_pass http://localhost:8002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then enable SSL with Let's Encrypt:
```bash
sudo certbot --nginx -d api-shield.yourdomain.com
```

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.


