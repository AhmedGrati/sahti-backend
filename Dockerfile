FROM node:16.13.1 As development

LABEL maintainer="ahmedgrati1999@gmail.com"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps 

COPY . .

RUN npm run build

ENTRYPOINT ["npm", "run", "start"]