FROM node:latest


COPY package.json /app
COPY package-lock.json /app

RUN npm install

WORKDIR /app

COPY pages /app/pages
COPY public /app/public
COPY src /app/src
COPY next.config.js /app
COPY server.js /app
COPY socket.js /app

CMD ["node", "server.js"]
q
