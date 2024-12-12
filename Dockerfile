FROM postgres:15-alpine

ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

EXPOSE 5432

FROM dpage/pgadmin4

ENV PGADMIN_DEFAULT_EMAIL=root@root.com
ENV PGADMIN_DEFAULT_PASSWORD=root

EXPOSE 80

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

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
EXPOSE 3000
CMD npm run prisma:migrate:prod && npm run backend:prod
