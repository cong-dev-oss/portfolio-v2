# --- Stage 1: Build source code ---
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

# Install Chromium for prerender (puppeteer-core)
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm run build && npm run prerender

# --- Stage 2: Serve tĩnh bằng Nginx (dành cho frontend) ---
FROM nginx:alpine

# Copy toàn bộ file đã build từ Stage 1
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
