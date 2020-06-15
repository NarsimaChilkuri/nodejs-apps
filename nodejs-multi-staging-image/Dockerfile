FROM node:11.10.0-alpine AS build

RUN apk add --update --no-cache \
    python \
    make 

WORKDIR /src
COPY ./package* ./

RUN npm install

COPY . .

RUN npm run build:nginx

RUN npm prune --production

FROM nginx:1.15.8-alpine

RUN apk add --update --no-cache curl

WORKDIR /usr/src/service

COPY --from=build /src/dist ./dist
COPY --from=build /src/nginx ./nginx


RUN ["chmod", "+x", "./nginx/entrypoint.sh"]

ENTRYPOINT [ "ash", "./nginx/entrypoint.sh" ]
