# base image
FROM node:alpine

# make a folder to put our files 
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend

#set working directory so that all subsquent commands runs on this folder
WORKDIR /usr/src/app/frontend

# Copy package json and install dependencies
COPY package*.json ./
RUN yarn install

# Copy our app
COPY . .

# Expose port to access server
EXPOSE 3000

# Command to run our app
CMD [ "yarn", "start"]