FROM node:10.19.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install jquery --save

RUN npm install popper.js --save

COPY . .

EXPOSE 8000

CMD ["npm", "start"]