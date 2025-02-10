FROM node:18-alpine as build

WORKDIR /gameapp-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "start"]