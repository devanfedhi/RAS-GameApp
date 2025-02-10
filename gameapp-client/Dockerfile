FROM node:18-alpine as build

WORKDIR /gameapp-client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "preview"]