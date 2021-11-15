FROM node:14.16.1-alpine3.11 As development

LABEL maintainer="ahmedgrati1999@gmail.com"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps 

COPY . .

RUN npm run build

ENTRYPOINT ["npm", "run", "start"]