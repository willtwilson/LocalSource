#!/bin/bash

# Remove all unused containers, networks, images (both dangling and unreferenced), and optionally, volumes.
docker system prune -af --volumes

# Log the cleanup activity
echo "Docker cleanup performed on $(date)" >> /var/log/docker_cleanup.log 