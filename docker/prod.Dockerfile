FROM node:latest

WORKDIR /app


COPY package.json /app
COPY package-lock.json /app

RUN npm install


COPY pages /app/pages
COPY public /app/public
COPY src /app/src
COPY next.config.js /app
COPY server.js /app
COPY socket.js /app

RUN npm run build


CMD ["npm", "run start"]

