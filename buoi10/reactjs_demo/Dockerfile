FROM node:22-alpine3.19
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
ENTRYPOINT [ "serve","-s","build" ]