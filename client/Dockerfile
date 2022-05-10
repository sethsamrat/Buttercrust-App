FROM node:10.19.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --verbose

COPY . .

EXPOSE 3000

CMD ["npm", "start"]