pipeline {
  agent any

  environment {
    REGISTRY = "31.220.88.14:5050"
    IMAGE = "${REGISTRY}/congvc/portfolio-v2"
    TAG = "${env.BUILD_NUMBER}"
    DEMO_HOST = "31.220.88.14"
    DEMO_USER = "congvc"
    DEMO_PATH = "/srv/demo/portfolio-v2"
    IMAGE_LATEST = "${IMAGE}:main-latest"
    IMAGE_BUILD = "${IMAGE}:${TAG}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build & Push Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'registry-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login "$REGISTRY" -u "$DOCKER_USER" --password-stdin
            docker build -t "$IMAGE_BUILD" -t "$IMAGE_LATEST" .
            docker push "$IMAGE_BUILD"
            docker push "$IMAGE_LATEST"
          '''
        }
      }
    }

    stage('Deploy Demo') {
      steps {
        sshagent(credentials: ['demo-ssh-key']) {
          sh '''
            ssh -o StrictHostKeyChecking=no "$DEMO_USER@$DEMO_HOST" "
              # Nếu thư mục chưa có thì tạo mới, tránh lỗi
              mkdir -p $DEMO_PATH
              cd $DEMO_PATH
              
              # Nếu file compose chưa tồn tại, tải tự động từ file mẫu chuẩn (Tùy chọn)
              if [ ! -f docker-compose.yml ]; then
                echo \\"services:
  app:
    image: \\${IMAGE}
    container_name: portfolio-v2
    restart: unless-stopped
    ports:
      - \\"9001:80\\"\\" > docker-compose.yml
              fi

              export IMAGE=$IMAGE_LATEST
              docker compose pull || true
              docker compose up -d
            "
          '''
        }
      }
    }
  }
}
