# # Stage 1: build stage
# FROM node:16-alpine AS build

# WORKDIR /app

# # Копируем package.json и устанавливаем зависимости
# COPY package.json package-lock.json ./

# RUN npm install

# # Копируем весь исходный код
# COPY . ./

# # Строим проект для продакшн
# RUN npm run build 

# # Stage 2: production stage
# FROM nginx:alpine

# # Копируем собранные файлы из первого этапа в папку nginx
# COPY --from=build /app/dist /usr/share/nginx/html  

# # Открываем порт 80
# EXPOSE 80

# # Стартуем nginx
# CMD ["nginx", "-g", "daemon off;"]
# Step 1: Use official Node.js LTS image
FROM node:16-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose port 5000
EXPOSE 5173

# Step 7: Start the server
CMD ["npm", "run", "dev"]