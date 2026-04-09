# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CITADEL AI Playground - A web application for exploring and testing AI models designed for low-resource languages (particularly Mooré, a language spoken in Burkina Faso). Built with TanStack Start, deployed to Cloudflare Workers.

## Commands

```bash
npm run dev      # Start development server on port 8080
npm run build    # Build for production (Cloudflare Workers)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Architecture

- **Framework**: TanStack Start (React full-stack with SSR)
- **Routing**: TanStack React Router with file-based routing in `src/routes/`
- **Deployment**: Cloudflare Workers via `@cloudflare/vite-plugin` and Wrangler
- **UI Components**: Radix UI primitives with custom styling in `src/components/ui/`
- **Styling**: Tailwind CSS v4 with custom theme in `src/styles.css`

## Design System

Custom CITADEL color palette defined in CSS variables (oklch format):
- `--citadel-green`: Primary brand color
- `--citadel-gold`: Accent color
- `--citadel-red`: Status/alert color
- `--citadel-dark`: Dark text
- `--citadel-card-hover`: Card hover state

The `@theme inline` block in `styles.css` maps these to Tailwind utilities.

## Key Files

- `src/router.tsx`: Router configuration with error handling
- `src/routeTree.gen.ts`: Auto-generated route tree (do not edit manually)
- `src/routes/__root.tsx`: Root layout with SEO metadata
- `src/routes/index.tsx`: Main playground page
- `src/components/ModelCard.tsx`: Reusable model card component
- `src/styles.css`: Global styles and design system

## Route Structure

Routes use TanStack React Router's file-based routing. The `createFileRoute` function generates routes from `src/routes/`.

## Development Notes

- Dev server runs on port 8080
- Build output targets Cloudflare Workers (not Node.js)
- Use `createFileRoute` for new routes - the route tree auto-generates from file structure
- Tailwind v4 uses `@theme inline` for custom properties - extends in `styles.css`