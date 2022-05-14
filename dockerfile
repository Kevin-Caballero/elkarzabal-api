FROM node:14.16-alpine
WORKDIR "/elkarzabal-api"
COPY package*.json ./elkarzabal-api
RUN npm i
COPY . .
CMD [ "npm", "run", "start:debug" ]