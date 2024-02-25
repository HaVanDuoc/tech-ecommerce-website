FROM node:18-alpine
WORKDIR /server
COPY package*.json .
RUN npm install
RUN npm install -g nodemon
COPY . .
RUN npm run build-src
CMD ["npm","run", "build"]
EXPOSE 5000

# docker build -t server .
# docker run -dp 127.0.0.1:5000:5000 server