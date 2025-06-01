FROM node:20-alpine AS build

WORKDIR /usr/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /usr/app
ENV NODE_ENV=production

COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/package.json ./

RUN mkdir -p /usr/app/data && chown -R node:node /usr/app

USER node

CMD ["node", "dist/main.js"]
