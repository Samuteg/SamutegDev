# ── Stage 1: Build ──────────────────────────────────────────────
FROM node:22-alpine AS builder

# pnpm needs this
RUN corepack enable

WORKDIR /app

# Install dependencies first (better cache)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the source
COPY . .

# Build the Astro site
RUN pnpm build

# ── Stage 2: Serve ─────────────────────────────────────────────
FROM nginx:stable-alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Custom nginx config for Astro static site
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
