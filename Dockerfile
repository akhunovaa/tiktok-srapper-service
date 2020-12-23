FROM node:10.15.0-slim

RUN mkdir -p /app
WORKDIR /app
COPY . /app

CMD npm start
