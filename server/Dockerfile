# Step 1: Use official Node.js LTS image
FROM node:16-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose port 5000
EXPOSE 5001

# Step 7: Start the server
CMD ["npm", "run", "dev"]

