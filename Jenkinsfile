pipeline {
    agent any

    parameters {
        booleanParam(name: 'PUSH_TO_DOCKERHUB', defaultValue: false,
                     description: 'Push images to Docker Hub')
    }

    environment {
        DOCKERHUB_USER = 'smzaid321'
        BACKEND_IMAGE  = "${DOCKERHUB_USER}/codereview-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/codereview-frontend"
        IMAGE_TAG      = "${BUILD_NUMBER}"
        COMPOSE_PROJECT_NAME = 'smart-code-reviewer'
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Prepare env file') {
            steps {
                withCredentials([file(credentialsId: 'server-env', variable: 'ENV_FILE')]) {
                    sh 'cp "$ENV_FILE" server/.env'
                }
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE:$IMAGE_TAG -t $BACKEND_IMAGE:latest ./server'
                sh 'docker build -t $FRONTEND_IMAGE:$IMAGE_TAG -t $FRONTEND_IMAGE:latest ./client'
            }
        }

        stage('Push to Docker Hub') {
            when { expression { params.PUSH_TO_DOCKERHUB } }
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                 usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
                    sh 'echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin'
                    sh 'docker push $BACKEND_IMAGE:$IMAGE_TAG'
                    sh 'docker push $BACKEND_IMAGE:latest'
                    sh 'docker push $FRONTEND_IMAGE:$IMAGE_TAG'
                    sh 'docker push $FRONTEND_IMAGE:latest'
                }
            }
        }

        stage('Deploy locally') {
            steps {
                sh 'docker compose -f docker-compose.yml up -d --build'
                sh 'docker compose -f docker-compose.yml ps'
            }
        }
    }

    post {
        always {
            sh 'rm -f server/.env'
            sh 'docker logout || true'
            sh 'docker image prune -f || true'
        }
        success { echo "Build #${env.BUILD_NUMBER} deployed at http://localhost:8000" }
        failure { echo 'Pipeline failed, check the console output' }
    }
}