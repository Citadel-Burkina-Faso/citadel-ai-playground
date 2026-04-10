# Adding a Model to the Playground

This guide explains how to integrate a new AI model into the CITADEL AI Playground.

## Overview

Each model consists of:
1. A **backend API** (must be Dockerized) at `/<model>/api/*`
2. A **frontend SPA** served at `/<model>/*` (React or Vanilla HTML/CSS/JS)
3. A **model card** in the playground landing page

Example for a translation model:
- Frontend: `/translation` → serves the model's frontend app
- API: `/translation/api/*` → backend endpoints used in the frontend

---

## Step 1: Containerize Your Model API

Your model must be served via a REST API inside a Docker container.

### Requirements

- Container listens on port **8080** internally
- All endpoints are prefixed with `/api` (e.g., `/api/predict`, `/api/health`)
- Health check at `GET /api/health`
- Endpoints follow REST conventions

### Example Endpoints

```bash
# Health check (required)
GET /api/health → 200 OK

# Prediction example
POST /api/predict
Body: { "text": "Hello world" }
→ { "result": "..." }
```

### Example Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### Building Your Image

```bash
docker build -t my-model-api:latest .
```

---

## Step 2: Build Your Model Frontend

The frontend is a SPA (React or Vanilla HTML/CSS/JS) that calls `/api/*` for predictions.

### Option A: Vanilla HTML/CSS/JS (Simplest)

```
my-translation-model/
├── index.html
├── styles.css
├── app.js
└── model-config.json
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Translation Model</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app">
    <textarea id="input" placeholder="Enter text..."></textarea>
    <button id="submit">Translate</button>
    <div id="result"></div>
  </div>
  <script src="app.js"></script>
</body>
</html>
```

```javascript
// app.js
const API_BASE = '/api';

document.getElementById('submit').addEventListener('click', async () => {
  const text = document.getElementById('input').value;
  const res = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  document.getElementById('result').textContent = data.result;
});
```

### Option B: React + Vite

```
my-translation-model/
├── src/
│   ├── App.tsx          # Main component with form/display
│   ├── main.tsx        # Entry point
│   ├── api.js          # Calls /api/predict
│   └── styles.css      # Your styles
├── public/
│   └── index.html
├── vite.config.ts      # Outputs to dist/
└── model-config.json   # Model metadata
```

```javascript
// src/api.js
const API_BASE = '/api';

export async function predict(text) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return res.json();
}
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/translation/',  // Must match your model path
  build: {
    outDir: 'dist',
  },
});
```

---

## Step 3: Configure Model Metadata

Create a `model-config.json` at the root of your repository:

```json
{
  "name": "My Translation Model",
  "description": "Machine translation between Mooré and French",
  "category": "translation",
  "path": "/translation",
  "status": "available",
  "icon": "Languages",
  "language": "Mooré"
}
```

| Field | Description |
|-------|-------------|
| `name` | Display name shown on the model card |
| `description` | Short description for the card |
| `category` | One of: `translation`, `transcription`, `tts`, `nlp` |
| `path` | URL prefix for your endpoints (e.g., `/translation`) |
| `status` | `available`, `beta`, or `coming-soon` |
| `icon` | Lucide icon name (e.g., `Languages`, `Mic`, `Brain`) |
| `language` | Primary language the model handles |

---

## Step 4: Apache Reverse Proxy Config

Provide a config snippet to integrate your model into the playground's Apache reverse proxy.

### Routing Rules

| Path | Destination |
|------|-------------|
| `/translation` | Frontend SPA (your built `index.html`) |
| `/translation/api/*` | Backend API container |

### Apache Config

```apache
# Frontend: serve static files from /var/www/playground.citadel.bf/translation
Alias /translation /var/www/playground.citadel.bf/translation

<Directory /var/www/playground.citadel.bf/translation>
    Require all granted
    FallbackResource /index.html
</Directory>

# Proxy API calls to backend container
ProxyPass /translation/api/ http://localhost:8081/api/
ProxyPassReverse /translation/api/ http://localhost:8081/api/

# CORS headers for API
<Location /translation/api/>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type"
</Location>
```

### Docker Compose (Recommended)

```yaml
services:
  translation-model:
    image: my-translation-api:latest
    ports:
      - "8081:8080"

  translation-frontend:
    image: my-translation-frontend:latest
    ports:
      - "8082:80"
```

---

## Step 5: Submit Your Integration

1. Publish your Docker images to a registry (Docker Hub, GHCR, etc.)
2. Create a PR with:
   - `model-config.json`
   - Apache config snippet (and docker-compose example)
   - Docker image URLs for frontend and backend
   - Optional: link to your model repository

---

## Integration Checklist

- [ ] Backend Docker image builds and runs on port 8080
- [ ] `/api/health` endpoint returns 200
- [ ] `/api/predict` (or similar) accepts POST requests
- [ ] Frontend API calls go to `/api/*` (not hardcoded localhost)
- [ ] `model-config.json` is complete
- [ ] Apache reverse proxy config provided
- [ ] CORS headers configured
- [ ] FallbackResource set for SPA routing (if using React Router)

---

## Icon Reference

Available Lucide icons for model cards:

| Icon | Name | Use Case |
|------|------|----------|
| 🌍 | `Languages` | Translation |
| 🎤 | `Mic` | Transcription/ASR |
| 💬 | `MessageSquare` | TTS/Text-to-Speech |
| 🧠 | `Brain` | NLP/Analysis |
| 🔊 | `Volume2` | Speech synthesis |
| 📝 | `FileText` | Document processing |
| 🌐 | `Globe` | Multilingual |
| 📊 | `BarChart` | Analytics |
