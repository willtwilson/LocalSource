#!/bin/bash

# Function to check container health
check_container_health() {
    local container_name=$1
    local status=$(docker inspect --format='{{.State.Health.Status}}' "$container_name" 2>/dev/null)
    
    if [ $? -ne 0 ] || [ -z "$status" ]; then
        echo "Container $container_name not found or no health check defined"
        return 1
    fi
    
    echo "Container $container_name health status: $status"
    return 0
}

# Function to check system resources
check_system_resources() {
    # Memory usage
    echo "Memory Usage:"
    free -h | grep "Mem:"
    
    # Disk usage
    echo -e "\nDisk Usage:"
    df -h / | tail -n 1
    
    # CPU load
    echo -e "\nCPU Load:"
    uptime | awk '{print $8 $9 $10 $11 $12}'
}

# Function to check Docker metrics
check_docker_metrics() {
    local container_name=$1
    
    echo "Docker Stats for $container_name:"
    docker stats --no-stream "$container_name" --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
}

# Main monitoring loop
main() {
    local container_name="vite"
    
    while true; do
        echo "=== Health Check Report $(date) ==="
        echo "=================================="
        
        # Check container health
        check_container_health "$container_name"
        
        # Check system resources
        check_system_resources
        
        # Check Docker metrics
        check_docker_metrics "$container_name"
        
        echo -e "\nNext check in 60 seconds..."
        echo "=================================="
        sleep 60
    done
}

# Run main function
main 