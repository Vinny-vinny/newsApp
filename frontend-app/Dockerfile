# Use Node.js base image
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the application
RUN npm run build

# Use an nginx image to serve the static files
FROM nginx:1.25-alpine

# Copy built files from the previous stage to nginx's html folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
