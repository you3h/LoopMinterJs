# Build the proxy server that will be exposed to the public
FROM node:lts

# Create the app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
# else
RUN npm install

# Copy the app source to the container app directory
COPY . .

# Expose the port that we will be accessing outside the container network
EXPOSE 8080

CMD npm start
