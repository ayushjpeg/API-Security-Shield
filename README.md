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

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

