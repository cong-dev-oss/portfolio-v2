pipeline {
  agent any

  environment {
    // Không cần dùng Registry ngoài, lưu thẳng Image trên máy chủ
    IMAGE_LATEST = "portfolio-v2:latest"
    
    // Thư mục chứa cấu hình chạy app
    DEMO_PATH = "/srv/demo/portfolio-v2"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Image (No Registry Needed)') {
      steps {
        script {
            sh 'docker build -t ${IMAGE_LATEST} .'
        }
      }
    }

    stage('Deploy Natively') {
      steps {
        sh '''
          # Vì Jenkins đã được mount thẳng ổ đĩa /srv/demo của Server mẹ vào nên ta tạo thẳng file!
          mkdir -p ${DEMO_PATH}
          cd ${DEMO_PATH}
          
          # Tự sinh file compose nếu chưa có
          if [ ! -f docker-compose.yml ]; then
            echo "services:
  app:
    image: ${IMAGE_LATEST}
    container_name: portfolio-v2
    restart: unless-stopped
    ports:
      - \\"9001:80\\"" > docker-compose.yml
          fi

          # Up container mới luôn!
          docker compose up -d
        '''
      }
    }
    
    stage('Clean Up') {
        steps {
            sh "docker image prune -f || true"
        }
    }
  }
}
