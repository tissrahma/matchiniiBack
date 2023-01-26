FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 9090

CMD [ "npm", "start" ]