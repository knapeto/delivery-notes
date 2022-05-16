FROM node:14
LABEL maintainer="Azure App Services Container Images <appsvc-images@microsoft.com>"

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

RUN apk add gcc libc-dev g++ libffi-dev libxml2 unixodbc-dev mariadb-dev postgresql-dev

# admin
RUN ls
RUN cd ./admin
RUN yarn install

EXPOSE 8080
CMD [ "npm", "start" ]