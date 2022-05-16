FROM node:14-alpine
LABEL maintainer="Azure App Services Container Images <appsvc-images@microsoft.com>"

# Create app directory
WORKDIR /app

RUN apk update
RUN apk add gcc libc-dev g++ libffi-dev libxml2 unixodbc-dev postgresql-dev

# Bundle app source
COPY . .

# admin
RUN ls
RUN cd ./admin
RUN yarn install

EXPOSE 8080
CMD [ "npm", "start" ]