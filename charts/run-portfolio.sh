#!/bin/bash

# 1️⃣ Start Minikube
echo "Starting Minikube..."
minikube start

# 2️⃣ Enable Ingress
echo "Enabling NGINX Ingress..."
minikube addons enable ingress

# 3️⃣ Wait for ingress controller to be ready
echo "Waiting for ingress controller to be ready..."
kubectl wait --namespace kube-system \
  --for=condition=ready pod \
  -l app.kubernetes.io/name=ingress-nginx \
  --timeout=120s

# 4️⃣ Get Minikube IP
MINIKUBE_IP=$(minikube ip)
echo "Minikube IP: $MINIKUBE_IP"

# 5️⃣ Suggest hosts file entries
echo "Add these lines to your /etc/hosts or C:\\Windows\\System32\\drivers\\etc\\hosts:"
echo "$MINIKUBE_IP  prakash-portfolio.devopsengineer"
echo "$MINIKUBE_IP  phpmyadmin.devopsengineer"

# 6️⃣ Open URLs in default browser (optional)
echo "Opening URLs in browser..."
if command -v xdg-open &> /dev/null
then
    xdg-open "http://prakash-portfolio.devopsengineer"
    xdg-open "http://phpmyadmin.devopsengineer"
elif command -v open &> /dev/null
then
    open "http://prakash-portfolio.devopsengineer"
    open "http://phpmyadmin.devopsengineer"
else
    echo "Please open the URLs manually in your browser."
fi
