#!/bin/bash
set -e

# Function to check if we can connect to Tailscale
# check_tailscale() {
#     # Increased timeout for potentially slower networks
#     curl -s --connect-timeout 10 http://100.100.100.100 > /dev/null
#     return $?
# }

# Wait for Tailscale to be available (container should be connected to Tailscale network)
# Commenting out the entire block as it seems to cause issues
# echo "Waiting for Tailscale network..."
# timeout 30 bash -c 'until check_tailscale; do sleep 1; done' || echo "Warning: Timed out waiting for Tailscale network check."
# echo "Proceeding regardless of Tailscale check..."

# Ensure node_modules has correct permissions
if [ -d "node_modules" ]; then
    echo "Setting node_modules permissions..."
    # Make sure the 'node' user/group exists in the container if using this
    # If running as root (default), this might not be necessary or could use root:root
    chown -R node:node node_modules || echo "Warning: Could not chown node_modules. Skipping."
fi

# Create the build directory if it doesn't exist and set permissions
mkdir -p dist
chown -R node:node dist || echo "Warning: Could not chown dist. Skipping."

# Get Tailscale IP for HMR configuration
# Commenting out direct tailscale command dependency
# TAILSCALE_IP=$(tailscale ip -4)
# if [ -n "$TAILSCALE_IP" ]; then
#     echo "Tailscale IP: $TAILSCALE_IP"
#     export VITE_HMR_HOST=$TAILSCALE_IP
# else
#     echo "Warning: Could not get Tailscale IP, using 0.0.0.0 for HMR"
#     export VITE_HMR_HOST="0.0.0.0"
# fi
echo "Using 0.0.0.0 for VITE_HMR_HOST (Tailscale check bypassed)"
export VITE_HMR_HOST="0.0.0.0"


# Start Vite development server
echo "Starting Vite development server..."
# Execute the command passed to the entrypoint (e.g., npm run dev)
exec "$@" 