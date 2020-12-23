FROM node:8.11-slim

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install -g ts-node
CMD ts-node .
