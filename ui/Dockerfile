# build
FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV PORT=80
EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]