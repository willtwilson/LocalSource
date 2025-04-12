# Build stage
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine as production

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Development stage - this will be used when running docker-compose up without specifying a target
FROM node:20-alpine as development

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose Vite's port
EXPOSE 5173

# Start Vite dev server (with host flag to allow external connections)
CMD ["npm", "run", "dev", "--", "--host"] 