FROM node:14
LABEL maintainer="Azure App Services Container Images <appsvc-images@microsoft.com>"

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# admin
RUN ls
RUN cd ./admin
RUN yarn install

EXPOSE 8080
CMD [ "npm", "start" ]