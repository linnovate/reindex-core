FROM node:alpine AS BUILDER

RUN apk add curl vim

RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

USER node

RUN npm set progress=false && \
        npm config set depth 0 && \
        npm install

COPY . . 

FROM BUILDER AS DEVELOPMENT

CMD npm run start:dev

FROM BUILDER AS PRODUCTION

CMD npm run start:prod




