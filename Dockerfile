FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
RUN npm ci -qy

COPY . .

ADD create_env.sh /usr/app/create_env.sh
RUN chmod +x /usr/app/create_env.sh
RUN bash /usr/app/create_env.sh

EXPOSE 3000

CMD ["npm", "start"]
