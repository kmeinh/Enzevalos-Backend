FROM node:carbon

WORKDIR /usr/src/app
COPY . .
EXPOSE 3000

CMD ["node", "Server/server.js"]