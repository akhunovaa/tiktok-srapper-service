FROM node:8.10.0-slim

RUN mkdir -p /app
WORKDIR /app
COPY . /app

CMD npm start
