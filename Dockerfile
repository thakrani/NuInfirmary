FROM node:12
WORKDIR /test
COPY package.json /test
RUN npm install
COPY . /test
ENTRYPOINT  ["node"]
CMD  ["app.js"]
EXPOSE 5000