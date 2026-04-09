# CITADEL AI Playground

Web application for exploring and testing AI models designed for low-resource languages (Mooré).

## Prerequisites

- Node.js 18+
- Bun (recommended) or npm

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:8080`.

## Production Build

```bash
# Build for Cloudflare Workers
npm run build

# Preview production build locally
npm run preview
```

## Deployment

The project deploys to Cloudflare Workers. After building:

```bash
# Deploy with Wrangler
npx wrangler deploy
```

## Linting

```bash
npm run lint
```