# ---- base deps cacheable ----
FROM node:20-alpine AS deps
WORKDIR /usr/app
COPY package*.json ./
# Разделяем dev и prod зависимости кэшируемо
RUN npm ci

# ---- build ----
FROM node:20-alpine AS build
WORKDIR /usr/app
COPY --from=deps /usr/app/node_modules ./node_modules
COPY . .
# Если у тебя Nest: это соберёт dist
RUN npm run build

# ---- prod-only deps ----
FROM node:20-alpine AS proddeps
WORKDIR /usr/app
COPY package*.json ./
# Только production зависимости
RUN npm ci --omit=dev

# ---- runtime ----
FROM node:20-alpine AS production
WORKDIR /usr/app
ENV NODE_ENV=production

# Ставим только продовые deps
COPY --from=proddeps /usr/app/node_modules ./node_modules
# Копируем билд и package.json
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/package.json ./

RUN mkdir -p /usr/app/data && chown -R node:node /usr/app
USER node
CMD ["node", "dist/main.js"]
