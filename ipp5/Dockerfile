# Run before containerize: ng build --output-path dist
FROM node:lts
RUN mkdir /app/
RUN mkdir /app/backend
RUN mkdir /app/dist
WORKDIR  /app
COPY backend/server.js backend/
COPY dist dist/
RUN npm install express body-parser mongodb fs cors
CMD node backend/server.js $PORT
