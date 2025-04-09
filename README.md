# web-app
This project contains the code file for creating a simple stateless login web application, file to containerize it and files to deploy it on kubernetes cluster with load balancer and horizontal pod autoscaling.

# app.js
Code of the web-app

# package.json
Contains the dependencies for the web-app to run (You can use this or create your own using the npm init -y to initialise your node.js environment)

# dockerfile
This file can be used to containerize this web-app

Run the below command to build the docker image:

docker build -t login-app .

Once the image is created you can run and check if the web-app is working or not via below command:

docker run -p 5000:5000 login-app

Now, to push this image to docker hub registry or your private registry you can use the below commands:

#Please note you need to create a repositiory on docker hub before using this commands.

Docker Hub commands:
docker login
docker tag local-image-name your-dockerhub-username/repo-name:tag
docker push your-dockerhub-username/repo-name:tag

Private Registry commands:
docker login registry.example.com
docker tag my-web-app registry.example.com/myuser/my-web-app:latest
docker push registry.example.com/myuser/my-web-app:latest

We are considering DigitalOcean platform to create our kubernetes cluster:

- Install doctl (DigitalOcean CLI) and configure it with your DigitalOcean account.

doctl auth init
doctl kubernetes cluster kubeconfig save <cluster-name>

- Verify the Kubernetes connection:

kubectl get nodes

Once got the connection is verified you can run the below commands to apply the following configuration .yaml files:

kubectl apply -f deployment.yaml
kubectl apply -f hpa.yaml

Verify the components created by the above files via these commands:

kubectl get deployments
kubectl get services
kubectl get hpa

OR

kubectl get all (To get details of all the components created in the cluster and their status)

# deployment.yaml
This is a kubernetes configuration file which configures deployment of the pods via the docker image created above and the load balancer service used for the connections.

# hpa.yaml
Configuration file to implement and configure Horizontal Pod Autoscaling

Please note the configuration files for kubernetes cluster contains all the required parameters to configure the components to run the kubernetes cluster.

# To connect to the web application pod we will need the external IP address assigned to the load balancer Service, which we can found in the output of "kubectl get services" command.

Once we got the external ip address we can connect to the web application via below link:

http://external-ip-address:port

#here the port is the one we configured in the deployment.yaml file for the load balancer service (port parameter).


