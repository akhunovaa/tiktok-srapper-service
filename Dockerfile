FROM node:8.11-slim

RUN mkdir -p /app
WORKDIR /app
COPY . /app

CMD ts-node .
