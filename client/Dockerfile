FROM node:10.19.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --verbose

RUN npm install jquery --save

RUN npm install popper.js --save

COPY . .

EXPOSE 3000

CMD ["npm", "start"]