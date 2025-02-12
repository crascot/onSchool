FROM node:20-alpine As development

WORKDIR /usr/app

COPY --chown=node:node package*.json ./

RUN npm ci

RUN npm install -g @nestjs/cli

USER node

FROM node:18-alpine As build

WORKDIR /usr/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:20-alpine As production

COPY --chown=node:node --from=build /usr/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/app/dist ./dist

CMD [ "node", "dist/main.js" ]