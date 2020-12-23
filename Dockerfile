FROM node:10.15.1-slim

RUN mkdir -p /app
WORKDIR /app
COPY . /app

CMD npm start
