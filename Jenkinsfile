pipeline {
    agent any

    environment {
        PROJECT_NAME = "demo-project-1"
        // Sử dụng mã Build Number của Jenkins làm Tag (ví dụ: v12)
        IMAGE_TAG = "v${env.BUILD_NUMBER}"
        // Thư mục này nằm trên máy chủ thật
        DEPLOY_DIR = "/opt/stacks/apps/demo-project-1"
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Tự động kiểm tra thay đổi trên GitLab Webhook
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "=> Compiling image ${PROJECT_NAME}:${IMAGE_TAG}..."
                    sh "docker build -t ${PROJECT_NAME}:${IMAGE_TAG} ."
                    sh "docker tag ${PROJECT_NAME}:${IMAGE_TAG} ${PROJECT_NAME}:latest"
                }
            }
        }

        stage('Deploy App') {
            steps {
                script {
                    echo "=> Tự động Deploy xuống thư mục ${DEPLOY_DIR}"
                    
                    // Tạo thư mục nếu chưa có
                    sh "mkdir -p ${DEPLOY_DIR}"
                    
                    // Gắn version mới vào file .env
                    sh "echo 'IMAGE_TAG=${IMAGE_TAG}' > ${DEPLOY_DIR}/.env"
                    sh "echo 'PROJECT_NAME=${PROJECT_NAME}' >> ${DEPLOY_DIR}/.env"
                    
                    // Trigger Docker-compose lên
                    sh "cd ${DEPLOY_DIR} && docker-compose pull || true"
                    sh "cd ${DEPLOY_DIR} && docker-compose up -d"
                }
            }
        }

        stage('Cleanup Tạm') {
            steps {
                echo "=> Dọn dẹp images cũ chống đầy ổ đĩa..."
                sh "docker image prune -f"
            }
        }
    }
    
    post {
        success {
            echo "✅ Build & Deploy Thành Công!"
        }
        failure {
            echo "❌ Gặp lỗi trong quá trình CI/CD! Cần kiểm tra Logs."
        }
    }
}
