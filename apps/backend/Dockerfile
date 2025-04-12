# Dockerfile for NestJS Backend (Single Stage - Attempt 4)

FROM node:22-alpine

WORKDIR /usr/src/app

# Install NestJS CLI globally - might not be needed if using npm run build
# RUN npm install -g @nestjs/cli

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev)
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application using npm script
RUN npm run build

# Ensure WORKDIR is set correctly before CMD
WORKDIR /usr/src/app

# Expose the application port
EXPOSE 3000

# Command to run the application using npm script
CMD ["npm", "run", "start:prod"] 