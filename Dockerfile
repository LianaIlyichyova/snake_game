# Используем node для сборки
FROM node:18-alpine AS build

# Рабочая папка
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект и собираем
COPY . .
RUN npm run build

# --- Production stage ---
FROM node:18-alpine AS production

WORKDIR /app

# Устанавливаем только prod-зависимости
COPY package*.json ./
RUN npm install --omit=dev

# Копируем собранный проект из build stage
COPY --from=build /app/dist ./dist

# Для Vite preview
EXPOSE 4173

# Запускаем собранное приложение
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
