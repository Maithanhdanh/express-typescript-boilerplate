FROM node:16.17.1-alpine
ENV NODE_ENV=production

WORKDIR /usr/src

COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./

COPY .env.example .env

RUN npm install --production

COPY build .

CMD ["node", "index.js"]
