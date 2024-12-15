FROM node:20-alpine as build
RUN apk add g++ make py3-pip --no-cache openssl

WORKDIR /app

RUN npm install -g npm@10.9.2
COPY ["package.json", "package-lock.json","./"]
RUN npm install
RUN npm i -g @nrwl/cli pm2@latest

COPY ["nx.json", "./"]
COPY prisma ./prisma/
COPY . .

RUN npx prisma generate
RUN npx nx run backend:build:production
RUN chmod +x /app/entrypoint.sh

ENV SERVER_PORT=${SERVER_PORT}
ENV DATABASE_URL=${DATABASE_URL}

EXPOSE 3000
ENTRYPOINT ["sh", "/app/entrypoint.sh"]