# --- Stage 1: Build source code ---
FROM node:20-bookworm-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

# Install Chromium for prerender (puppeteer-core)
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    ca-certificates \
    fonts-freefont-ttf \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN npm run build && npm run prerender

# --- Stage 2: Serve tĩnh bằng Nginx (dành cho frontend) ---
FROM nginx:alpine

# Copy toàn bộ file đã build từ Stage 1
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
