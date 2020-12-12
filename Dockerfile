FROM node:14.15.1-alpine
WORKDIR /
RUN npm i -g @adonisjs/cli
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
EXPOSE 8080
ENV NPM_CONFIG_LOGLEVEL warn
USER node
CMD ["adonis", "serve"]
