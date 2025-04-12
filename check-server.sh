#!/bin/bash

# Define the URLs to check
LOCAL_URL="http://localhost:5173"
TAILSCALE_URL="http://100.74.46.117:5173"

# Check if server is accessible locally
echo "Checking local server access at $LOCAL_URL..."
if curl -s --head --request GET $LOCAL_URL | grep "200 OK" > /dev/null; then
    echo "✅ Local server is accessible"
else
    echo "❌ Cannot access local server at $LOCAL_URL"
fi

# Check if server is accessible via Tailscale
echo "Checking Tailscale server access at $TAILSCALE_URL..."
if curl -s --head --request GET $TAILSCALE_URL | grep "200 OK" > /dev/null; then
    echo "✅ Tailscale server is accessible"
else
    echo "❌ Cannot access server via Tailscale at $TAILSCALE_URL"
fi 