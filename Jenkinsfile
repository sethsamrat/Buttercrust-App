pipeline {
    agent any
    	    environment {
                registry1 = "sethsamrat/client"
                registry2 = "sethsamrat/server"
                registryCredential = 'docker_cred'
                dockerImage = ''
            }

    stages {
        stage("Git clone") {
            steps {
                git url: 'https://github.com/sethsamrat/Buttercrust-App.git', branch: 'master'
            }
        }
        stage("Frontend prerequisite installations") {
            steps{
                dir('client'){
                    sh 'npm install'
                }
            }
        }

        stage('Backend prerequisite installations'){
            steps {
                dir(''){

                    sh 'npm install'

                }
            }
        }

        stage('Building the images'){
            steps {
                dir('client'){
                    sh 'docker build -t sethsamrat/client .'
                }
                dir(''){
                    sh 'docker build -t sethsamrat/server .'
                }
            }
        }

        stage('Pushing the images to DockerHub'){
            steps{
                script {
                    withDockerRegistry([ credentialsId: registryCredential, url: "" ])
                    {sh 'docker push $registry1'}

                    withDockerRegistry([ credentialsId: registryCredential, url: "" ])
                    {sh 'docker push $registry2'}
                }
            }
        }

        stage('Ansible Deploy') {
             steps {
                  ansiblePlaybook colorized: true,credentialsId: "container_access_key", disableHostKeyChecking: true, installation: 'Ansible', inventory: 'inventory', playbook: 'playbook.yml'
             }
        }
    }
}