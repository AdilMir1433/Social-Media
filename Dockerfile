# Use an official node image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies including TypeScript
RUN npm install

# Copy the rest of the application
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Transpile TypeScript to JavaScript
RUN tsc

# Expose port 3000 (or whatever port your app uses)
EXPOSE 6969

# Start the application using the compiled JavaScript
CMD ["node", "dist/app.js"]
