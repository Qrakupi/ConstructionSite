pipeline {
  agent {
    docker {
      image 'maven:3.6.0-jdk-8'
      args '-v Users/HPZBook/2:/root/.m2'
    }

  }
  stages {
    stage('Initialize') {
      steps {
        sh '''
echo PATH = ${PATH}
echo M2_HOME = ${M2_HOME}
mvn clean'''
      }
    }
    stage('Build') {
      steps {
        sh 'mvn -Dmaven.test.failure.ignore=true install'
      }
    }
    stage('Report') {
      steps {
        junit 'target/surefire-reports/**/*.xml'
        junit 'target/*.jar,target/*.hpi'
      }
    }
  }
}