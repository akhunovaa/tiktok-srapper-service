FROM node:8.10

RUN mkdir -p /app
WORKDIR /app
COPY . /app

CMD npm start
