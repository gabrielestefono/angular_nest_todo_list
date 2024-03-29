# Segunda etapa para o frontend
FROM node:14 AS frontend

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
