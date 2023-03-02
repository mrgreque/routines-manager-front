FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

SHELL [ "echo", "RUN yarn install" ]

COPY [".", "."]

SHELL [ "echo", "RUN COPY" ]

EXPOSE 3000

CMD [ "yarn", "dev" ]