# Multi-stage build для React приложения
FROM node:18-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для кэширования зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Переменные окружения для сборки (будут доступны как VITE_*)
ARG VITE_API_BASE_URL=http://localhost:3001
ARG VITE_API_SPAM_EMAILS_ENDPOINT=/api/spam-emails
ARG VITE_API_SPAM_GENERATE_ENDPOINT=/api/spam-emails/generate
ARG VITE_APP_TITLE=Spam Dashboard
ARG VITE_APP_VERSION=1.0.0
ARG VITE_DEV_MODE=false
ARG VITE_DEBUG_LOGS=false

# Устанавливаем переменные окружения для сборки
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_SPAM_EMAILS_ENDPOINT=$VITE_API_SPAM_EMAILS_ENDPOINT
ENV VITE_API_SPAM_GENERATE_ENDPOINT=$VITE_API_SPAM_GENERATE_ENDPOINT
ENV VITE_APP_TITLE=$VITE_APP_TITLE
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_DEV_MODE=$VITE_DEV_MODE
ENV VITE_DEBUG_LOGS=$VITE_DEBUG_LOGS

# Собираем приложение
RUN npm run build

# Production stage с nginx
FROM nginx:alpine

# Копируем собранное приложение
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
