ARG PLUGINS_IMAGE_REF=""

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

FROM $PLUGINS_IMAGE_REF AS PLUGINS

FROM BUILDER AS PRODUCTION

COPY --from=PLUGINS /usr/src/app node_modules/@reindex

CMD npm run start:prod




