FROM node:carbon

WORKDIR /usr/src/app
COPY . .
EXPOSE 3000

RUN ["node", "Server/server.js"]