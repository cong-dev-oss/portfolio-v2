# PortfolioV2 CI/CD & Infra Design (Docker All‑in‑One)

## 1. Mục tiêu

- Deploy ứng dụng `portfolioV2` (React/Vite) lên VPS theo chuẩn:
  - Mọi thành phần (GitLab, Jenkins, app, Nginx, DB, cache, Qdrant) chạy bằng Docker.
  - Cấu trúc thư mục cố định tại `/opt/stacks/`.
  - CI/CD dùng **Jenkins Multibranch Pipeline** lấy source từ **GitLab**.
  - Jenkins build **Docker image riêng cho app**, push lên **GitLab Container Registry**, sau đó deploy qua `docker compose` trong `/opt/stacks/infra`.
- Kết nối GitLab ↔ Jenkins dùng **Docker network nội bộ** (không phụ thuộc IP public).

## 2. Cấu trúc thư mục trên VPS

Gốc: `/opt/stacks/`

```text
/opt/stacks/
├── infra/
│   ├── docker-compose.yml        ← Nginx + PostgreSQL + Redis + Qdrant + App
│   └── nginx/
│       ├── conf.d/default.conf   ← Nginx server blocks / reverse proxy
│       └── certs/                ← TLS certs (để trống giai đoạn đầu)
├── devops/
│   └── docker-compose.yml        ← GitLab + Jenkins (+ Runner nếu cần)
├── env/
│   └── infra.env                 ← Biến môi trường (chmod 600)
└── scripts/
    └── backup-all.sh             ← Backup gộp
```

### 2.1. `/opt/stacks/devops/docker-compose.yml`

- Khai báo network dùng chung:

  - `networks.stacks_net` (external: true) – tạo một lần, các compose khác dùng chung.

- Services chính:

  - `gitlab`:
    - `image: gitlab/gitlab-ce:latest`.
    - `hostname: gitlab`.
    - `external_url: http://gitlab:8080`.
    - Tham gia network `stacks_net`.
    - `ports: ["8080:8080"]` nếu cần truy cập GitLab UI từ host qua `http://<IP_VPS>:8080`.
    - Volumes: cấu hình GitLab (`/etc/gitlab`), logs, data.

  - `jenkins`:
    - `image: jenkins/jenkins:lts-jdk17`.
    - `hostname: jenkins`.
    - Tham gia network `stacks_net`.
    - `ports: ["8081:8080"]` để vào Jenkins UI qua `http://<IP_VPS>:8081`.
    - Volumes: `/var/jenkins_home`.
    - Mount Docker socket: `/var/run/docker.sock:/var/run/docker.sock` để Jenkins build image và điều khiển docker trên host.

  - (Tuỳ nhu cầu) `gitlab-runner`:
    - Đăng ký với GitLab nếu về sau muốn dùng GitLab CI song song với Jenkins.

### 2.2. `/opt/stacks/infra/docker-compose.yml`

- Dùng network `stacks_net` (external) giống `devops` để:
  - Nginx reverse proxy tới `app`.
  - App có thể truy cập GitLab nếu cần (ít dùng).

- Services dự kiến:

  - `nginx`:
    - Image Nginx stable (hoặc custom).
    - Mount cấu hình:
      - `./nginx/conf.d:/etc/nginx/conf.d`.
      - `./nginx/certs:/etc/nginx/certs`.
    - Tham gia `stacks_net`.
    - `ports: ["80:80", "443:443"]`.

  - `app`:
    - `image: registry.gitlab.local/<user_or_group>/portfoliov2:latest` (hoặc theo tag).
    - `env_file: ../env/infra.env`.
    - Expose port nội bộ (ví dụ 3000) cho Nginx proxy đến.

  - `postgres`, `redis`, `qdrant`:
    - Mỗi service một container, cùng network `stacks_net`.
    - Tham chiếu biến môi trường từ `infra.env`.

### 2.3. `/opt/stacks/env/infra.env`

- File `.env` chứa:
  - `NODE_ENV=production`.
  - Thông tin DB, Redis, Qdrant, các API key cần cho app.
- Phân quyền: `chmod 600 infra.env` trên VPS.
- Được mount vào service `app` (và các service khác nếu cần).

### 2.4. `/opt/stacks/scripts/backup-all.sh`

- Script shell chịu trách nhiệm:
  - Dump database (PostgreSQL) về file.
  - Sao lưu volume quan trọng: GitLab data, Jenkins home, env, v.v.
  - Nén lại thành một archive và lưu vào thư mục backup theo ngày.
- Có thể tích hợp chạy qua cron trên host hoặc job Jenkins riêng.

## 3. Kết nối GitLab ↔ Jenkins (trên Docker network nội bộ)

### 3.1. Network & DNS

- Cả GitLab và Jenkins đều thuộc network Docker `stacks_net`.
- Bên trong network:
  - GitLab được truy cập qua hostname `http://gitlab:8080`.
  - Jenkins được truy cập qua hostname `http://jenkins:8080`.
- Không cần dựa vào IP public hay DNS ngoài, mọi thứ nội bộ.

### 3.2. Webhook từ GitLab sang Jenkins

- Trong GitLab (Project `portfolioV2`):
  - Vào **Settings → Webhooks**.
  - Thêm webhook URL trỏ tới Jenkins, ví dụ:
    - `http://jenkins:8080/gitlab/build_now` (tuỳ plugin GitLab trong Jenkins).
  - Chọn events: push, merge request, v.v. (tối thiểu push event).

- Jenkins cần cài plugin phù hợp:
  - Git plugin, GitLab plugin (hoặc equivalent) để nhận webhook và scan repository.

### 3.3. Credential GitLab trong Jenkins

- Dùng **Personal Access Token (PAT)** trên GitLab:
  - Tạo PAT từ user `root` (hoặc user chuyên dụng).
  - Scope đủ để:
    - Clone repo (read_repository).
    - Push / write registry (write_registry) nếu Jenkins cần dùng API GitLab.
- Trong Jenkins:
  - Tạo **Credential** (Username + Password/API Token).
  - Gán credential ID cho cấu hình Multibranch Pipeline:
    - Dùng cho việc clone repo qua HTTP:  
      `http://gitlab:8080/<user_or_group>/portfolioV2.git`.

## 4. GitLab Registry & Image app

### 4.1. Registry nội bộ GitLab

- Dùng domain nội bộ, ví dụ: `registry.gitlab.local` (tuỳ theo config GitLab).
- Image app:
  - `registry.gitlab.local/<user_or_group>/portfoliov2:<tag>`.

### 4.2. Build & push image từ Jenkins

- Jenkins sử dụng Docker daemon trên host (mount Docker socket) để:
  - `docker build` image app.
  - `docker login` vào GitLab registry bằng PAT (credential Jenkins).
  - `docker push` image lên registry.

## 5. Jenkins Multibranch Pipeline cho `portfolioV2`

### 5.1. Nguồn repo

- Repo GitLab: `portfolioV2`.
- URL nội bộ: `http://gitlab:8080/<user_or_group>/portfolioV2.git`.
- Jenkins job loại **Multibranch Pipeline**:
  - Sử dụng credential GitLab đã tạo.
  - Scan branch và tạo job cho mỗi branch.

### 5.2. Jenkinsfile – pipeline tổng quan

Các stage chính:

1. **checkout**
   - Clone source từ GitLab theo branch hiện tại.

2. **install**
   - Dùng Node (qua agent hoặc container) để:
     - `npm ci` hoặc `npm install`.

3. **test**
   - Chạy:
     - `npm run lint`.
     - (Tuỳ chọn) test unit nếu có.

4. **build**
   - `npm run build` (Vite) → tạo thư mục `dist/`.

5. **docker-build**
   - Dùng Docker trên host để build image:
     - Tag: theo commit (`${GIT_COMMIT}`) và/hoặc theo branch.

6. **docker-push**
   - Đăng nhập registry GitLab.
   - Push image vừa build.

7. **deploy (branch main)**
   - Chỉ chạy khi branch = `main`.
   - Thực thi trên VPS (qua SSH hoặc trực tiếp nếu Jenkins chia sẻ docker host):
     - `cd /opt/stacks/infra`.
     - `docker compose pull app`.
     - `docker compose up -d app`.

### 5.3. Chiến lược theo branch

- **Branch `main`**:
  - Build + push image với tag `latest` (và có thể thêm `main-<short_sha>`).
  - Chạy stage `deploy` để cập nhật môi trường production.

- **Các branch khác**:
  - Build + push image với tag riêng theo branch/commit.
  - Không deploy (hoặc deploy tới môi trường staging nếu sau này bổ sung).

## 6. Luồng CI/CD đầy đủ

1. Developer push code lên GitLab (branch `main` hoặc branch khác).
2. GitLab gửi webhook tới Jenkins qua URL nội bộ `http://jenkins:8080/...`.
3. Jenkins Multibranch Pipeline tương ứng branch được trigger.
4. Jenkins:
   - Checkout code.
   - Install dependency, chạy lint/test.
   - Build bundle frontend (`npm run build`).
   - Build Docker image `portfoliov2`.
   - Push image lên GitLab Container Registry.
5. Nếu branch là `main`:
   - Jenkins chạy lệnh deploy:
     - `cd /opt/stacks/infra`.
     - `docker compose pull app && docker compose up -d app`.
   - Service `app` trong `infra/docker-compose.yml` dùng image mới từ registry.
6. Nginx trong `infra` đang reverse proxy tới `app`, nên site tự động cập nhật.

## 7. Nginx reverse proxy

- File `infra/nginx/conf.d/default.conf` (ý tưởng thiết kế):
  - Server block cho HTTP:
    - `listen 80`.
    - `server_name <domain_or_ip>;`.
    - `location /` → `proxy_pass http://app:3000;`.
  - Sau này có thể bổ sung `server` block cho HTTPS (listen 443, dùng certs từ `nginx/certs`).

- Nginx container tham gia `stacks_net`, nên hostname `app` resolve được tới container app.

## 8. Backup chiến lược

- `scripts/backup-all.sh`:
  - Dump Postgres:
    - `pg_dump` từ container `postgres` (qua `docker exec` hoặc container phụ).
  - Backup volume:
    - GitLab (`/var/opt/gitlab`, `/etc/gitlab`, `/var/log/gitlab`).
    - Jenkins (`/var/jenkins_home`).
    - File env (`/opt/stacks/env`).
  - Nén thành archive, đặt tên theo timestamp, lưu vào thư mục backup (ví dụ `/opt/backups`).
  - Có thể cấu hình cron để chạy định kỳ.

## 9. Lưu ý & mở rộng

- Mọi kết nối nội bộ ưu tiên qua Docker network (`stacks_net`), hạn chế phụ thuộc IP cụ thể.
- Jenkins giữ vai trò trung tâm CI/CD cho app hiện tại, nhưng cấu trúc `/opt/stacks/` cho phép thêm nhiều app khác trong tương lai (chung infra, devops).
- Về sau có thể:
  - Thêm môi trường staging (ví dụ `/opt/stacks-staging/`).
  - Tách GitLab/Jenkins sang VPS khác nếu tải lớn, không phải thay đổi nhiều logic CI/CD.

