### To create Kubernetes Secret object in command line

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdfasdf

# WHERE secret name: jwt-secret
#       key-value pair: JWT_KEY=asdfasdf
