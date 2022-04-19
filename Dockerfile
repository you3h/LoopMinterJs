### Stage 1 - client build ###
FROM node:lts as build-deps
ENV GENERATE_SOURCEMAP false
WORKDIR /usr/src/client
COPY ./client/package*.json ./
RUN npm ci --silent
# RUN npm audit
COPY ./client .
RUN npm run build

### Stage 2 - server build ###
FROM node:lts as build-srv
WORKDIR /usr/src/server
COPY ./server/package*.json ./
RUN npm ci --production
# RUN npm audit
COPY ./server .

### Stage 3 - install system libraries and copy all files ###
FROM node:16
WORKDIR /usr/src
COPY --from=build-deps /usr/src/client/build ./client/build
COPY --from=build-srv /usr/src/server ./server
WORKDIR /usr/src/server

CMD npm start
