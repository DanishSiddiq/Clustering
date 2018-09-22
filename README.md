# Clustering
Testing clustering and IPC in Nodejs. 
To observe application performance in single threaded and clustering behavior 
Steps to run applciation 
install yarn
clone project
navigate to project directory
run command: yarn install 
run command: yarn dev
Pass true in app.js in "setupServer" method to setup with cluster or without cluster
In case application will run in single threaded mode then comment IPC code in worker thread 
