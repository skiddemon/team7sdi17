FROM node:alpine

WORKDIR /backend

COPY . /backend

RUN npm install

RUN yarn install

RUN yarn global add nodemon

CMD npm start