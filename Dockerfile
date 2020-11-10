FROM node:10.13.0-alpine

RUN mkdir -p /app
WORKDIR /app
COPY . /app

CMD ts-node .