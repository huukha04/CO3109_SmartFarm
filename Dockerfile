FROM node:lts-alpine

WORKDIR /home/node

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build
USER node

ARG PORT

CMD ["npm", "start"]
