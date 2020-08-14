FROM node:latest

WORKDIR /api-care

COPY package*.json ./

RUN npm install --production

COPY ./.env ./

COPY ./dist ./dist

COPY ./client ./client

ENV NODE_ENV=production


CMD ["npm", "start"]