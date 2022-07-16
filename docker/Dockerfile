FROM node:alpine

COPY package*.json ./
RUN npm i

COPY . ./
EXPOSE 8080
CMD ["node", "index.js"]