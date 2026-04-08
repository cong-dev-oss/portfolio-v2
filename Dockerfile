# --- Stage 1: Build source code ---
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Serve tĩnh bằng Nginx (dành cho frontend) ---
FROM nginx:alpine

# Copy toàn bộ file đã build từ Stage 1
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
