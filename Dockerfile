# Use an official Node.js runtime as a parent image
FROM node:14

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN apt-get update && \
    apt-get install -y nodejs \
    npm

# Install project dependencies
RUN npm install

COPY . .

# Build your React application for production
# RUN npm run build

# Expose the port your app runs on (usually 3000)
EXPOSE 3000

# Define the command to start your app
CMD ["npm", "start"]
