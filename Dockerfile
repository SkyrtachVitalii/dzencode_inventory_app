# 1. Використовуємо новішу версію Node.js 20 (щоб Next.js не сварився)
FROM node:20-alpine

# 2. Встановлюємо OpenSSL (потрібен для роботи Prisma в Linux)
RUN apk add --no-cache openssl

# 3. Робоча папка
WORKDIR /app

# 4. Копіюємо файли конфігурації
COPY package*.json ./

# 5. !!! ВАЖЛИВИЙ МОМЕНТ !!!
# Копіюємо папку prisma ПЕРЕД npm install.
# Це потрібно, бо postinstall скрипт шукає schema.prisma
COPY prisma ./prisma

# 6. Тепер сміливо встановлюємо залежності
RUN npm install

# 7. Копіюємо решту файлів (src, public і т.д.)
COPY . .

# 8. Налаштовуємо базу даних
RUN npm run db:setup

# 9. Збираємо проект
RUN npm run build
RUN npm run build:server

# 10. Відкриваємо порт і запускаємо
EXPOSE 3000
CMD ["npm", "run", "start:prod"]