# 1. Устанавливаем зависимости в dev-окружении
FROM node:20-alpine AS development
WORKDIR /usr/app

COPY package*.json ./
RUN npm ci

COPY . .

# 2. Сборка приложения
FROM node:20-alpine AS build
WORKDIR /usr/app

COPY --from=development /usr/app/node_modules ./node_modules
COPY . .

RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

FROM node:20-alpine AS production
WORKDIR /usr/app

COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/package.json ./package.json

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
