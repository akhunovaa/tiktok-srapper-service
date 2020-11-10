FROM node:8.11-slim

RUN mkdir -p /app
WORKDIR /app

COPY dist/ /app

CMD ["ts-node","."]