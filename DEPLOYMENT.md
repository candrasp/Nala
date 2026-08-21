# Deployment Guide — Nala Admin Dashboard

This document provides step-by-step instructions for building and deploying the **Nala** admin dashboard template to various hosting providers, cloud platforms, and self-hosted environments.

---

## 📋 Table of Contents

- [1. Production Build](#1-production-build)
- [2. Cloud Hosting Providers](#2-cloud-hosting-providers)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
  - [Cloudflare Pages](#cloudflare-pages)
  - [GitHub Pages](#github-pages)
- [3. Docker & Container Deployment](#3-docker--container-deployment)
- [4. Traditional VPS (Nginx / Apache)](#4-traditional-vps-nginx--apache)
- [5. Environment Variables in Production](#5-environment-variables-in-production)
- [6. Performance & Caching Recommendations](#6-performance--caching-recommendations)
- [7. Troubleshooting Common Issues](#7-troubleshooting-common-issues)

---

## 1. Production Build

Nala is built as a **Single Page Application (SPA)** using Vite.

### Build Command

```bash
# Install dependencies
pnpm install

# Run type-checking & generate production bundle
pnpm build
```

The compiled static assets will be output to the **`dist/`** directory:

```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── InterVariable-[hash].woff2
├── favicon.svg
├── screenshot.png
└── index.html
```

### Previewing the Production Build Locally

```bash
pnpm preview
```

---

## 2. Cloud Hosting Providers

Because Nala uses Vue Router in HTML5 History mode (`createWebHistory`), **all server requests must rewrite to `index.html`** to prevent 404 errors when reloading deep URLs.

---

### Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket.
2. Import your repository into [Vercel](https://vercel.com/new).
3. Vercel will automatically detect **Vite**:
   - **Framework Preset:** `Vite`
   - **Build Command:** `pnpm build` (or `npm run build`)
   - **Output Directory:** `dist`
   - **Install Command:** `pnpm install`
4. Add your Environment Variables (e.g. `VITE_API_BASE_URL`).
5. Click **Deploy**.

#### Option B: SPA Rewrites Configuration (`vercel.json`)

Create a `vercel.json` file in the project root if manual rewrite configuration is needed:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### Netlify

#### Option A: Deploy via Netlify Dashboard

1. Link your Git repository on [Netlify](https://app.netlify.com/).
2. Set build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist`
3. Configure Environment Variables under **Site Configuration > Environment variables**.
4. Click **Deploy Site**.

#### Option B: SPA Redirects Configuration (`netlify.toml` or `public/_redirects`)

Create a `public/_redirects` file (Vite will automatically copy it to `dist/_redirects`):

```text
/*    /index.html   200
```

Or configure via `netlify.toml` in the project root:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Cloudflare Pages

There are two official ways to deploy Nala to Cloudflare Pages:

#### Option A: Direct Git Integration (Zero Configuration — Recommended)

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Compute (Workers) > Pages > Create a project > Connect to Git**.
2. Select your repository `candrasp/Nala`.
3. Configure build settings:
   - **Framework preset:** `Vue` or `Vite`
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
4. Add environment variables under **Settings > Environment variables** (e.g. `VITE_DEFAULT_LOCALE`, `VITE_DEFAULT_CURRENCY`, `VITE_DEFAULT_TIME_FORMAT=24h`).
5. SPA redirect rule is automatically handled by `public/_redirects` (`/*  /index.html  200`).
6. Click **Save and Deploy**. Every `git push origin main` will automatically build and deploy your demo.

#### Option B: Automated CD via GitHub Actions (`.github/workflows/deploy.yml`)

Nala includes a production-ready CI/CD pipeline at `.github/workflows/deploy.yml`:

1. In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
2. Add the following repository secrets:
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API Token with `Cloudflare Pages:Edit` permissions.
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID (found in Workers & Pages sidebar overview).
3. On every push to `main`, GitHub Actions will:
   - Run unit tests (`pnpm test:run`)
   - Run TypeScript check & build (`pnpm build`)
   - Automatically deploy `dist/` directly to Cloudflare Pages project named `nala`.

---

### GitHub Pages

For deploying to GitHub Pages under a subpath (e.g. `https://<username>.github.io/<repo-name>/`):

1. **Update Base Path** in `vite.config.ts`:
   ```ts
   // vite.config.ts
   export default defineConfig({
     base: process.env.NODE_ENV === 'production' ? '/nala/' : '/',
     // ... rest of config
   })
   ```

2. **GitHub Actions Workflow** — Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: 'pages'
     cancel-in-progress: true

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Install pnpm
           uses: pnpm/action-setup@v3
           with:
             version: 9

         - name: Set up Node.js
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'pnpm'

         - name: Install dependencies
           run: pnpm install --frozen-lockfile

         - name: Build project
           run: pnpm build

         - name: Setup Pages
           uses: actions/configure-pages@v4

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: 'dist'

         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

---

## 3. Docker & Container Deployment

### Multi-Stage `Dockerfile`

Create a `Dockerfile` in the root of your project:

```dockerfile
# ─── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency manifests
COPY package.json pnpm-lock.yaml ./

# Install dependencies with frozen lockfile
RUN pnpm install --frozen-lockfile

# Copy application source code
COPY . .

# Build application
RUN pnpm build

# ─── Stage 2: Serve with Nginx Alpine ──────────────────────────────────────────
FROM nginx:alpine AS runner

# Copy custom Nginx SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### `nginx.conf` for Docker

Create `nginx.conf` in the project root:

```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json image/svg+xml;

    # Serve static assets with long cache lifetime
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # SPA Routing: Fallback to index.html for unknown paths
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

### Build & Run Container

```bash
# Build Docker image
docker build -t nala-admin .

# Run container on port 8080
docker run -d -p 8080:80 --name nala-dashboard nala-admin
```

---

## 4. Traditional VPS (Nginx / Apache)

### Nginx Configuration

On Ubuntu / Debian systems (e.g. `/etc/nginx/sites-available/nala`):

```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;

    root /var/www/nala/dist;
    index index.html;

    # SSL configuration (recommended with Certbot / Let's Encrypt)
    # listen 443 ssl http2;
    # ssl_certificate /etc/letsencrypt/live/admin.yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/admin.yourdomain.com/privkey.pem;

    # Static assets with cache-busting hashes
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Route all requests to index.html for Vue Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Deny access to hidden files (.env, .git)
    location ~ /\. {
        deny all;
    }
}
```

Enable site & reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/nala /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Apache Configuration (`.htaccess`)

If using Apache, create `public/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 5. Environment Variables in Production

Vite embeds environment variables starting with **`VITE_`** into the client bundle during build time.

| Variable | Description | Example Production Value |
|---|---|---|
| `VITE_API_BASE_URL` | Backend REST API endpoint | `https://api.yourdomain.com/v1` |
| `VITE_APP_NAME` | Display name in header/browser | `Nala Cloud Console` |

> ⚠️ **Important Security Note:**  
> Variables prefixed with `VITE_` are bundled into client-side code and are publicly visible in browser inspector. **Never put private API keys, database credentials, or secret tokens in `.env` files.**

---

## 6. Performance & Caching Recommendations

1. **Asset Caching (`/assets/*`):**  
   Vite produces content-hashed filenames (e.g. `index-B1x8Z9.js`). Set `Cache-Control: public, max-age=31536000, immutable` for these files.
2. **HTML Entry (`index.html`):**  
   Always serve `index.html` with `Cache-Control: no-cache` so users instantly receive updates when a new release is deployed.
3. **Compression:**  
   Enable **Gzip** or **Brotli** compression on your web server to reduce JavaScript and CSS transfer size by up to 75%.

---

## 7. Troubleshooting Common Issues

### 1. 404 Error on Page Refresh
- **Cause:** Web server is trying to find a physical file matching the route path (e.g. `/users`) instead of serving `index.html`.
- **Solution:** Add the rewrite rule (`try_files $uri $uri/ /index.html;` for Nginx, or `/* /index.html 200` for Netlify/Cloudflare).

### 2. Assets Returning 404 or Blank White Screen
- **Cause:** Base path mismatch if hosting under a subdirectory.
- **Solution:** Ensure `base` in `vite.config.ts` matches your hosting path or is set to `'./'`.

### 3. Environment Variables Not Updating
- **Cause:** Vite bakes `VITE_*` variables at **build time**, not runtime.
- **Solution:** Re-run `pnpm build` after modifying production environment variables.

---

<p align="center">
  For further assistance, check the <a href="./README.md">README</a> or open an issue on the repository.
</p>
