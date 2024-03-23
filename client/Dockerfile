FROM node:18-alpine as builder
WORKDIR /client
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /client/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf