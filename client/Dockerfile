FROM node:18-alpine as builder
WORKDIR /client
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=builder /client/build /usr/share/nginx/html
EXPOSE 9000