FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
RUN npm ci -qy
RUN npm install -g @aws-amplify/cli

COPY . .

ADD create_env.sh /usr/app/create_env.sh
RUN chmod +x /usr/app/create_env.sh
RUN bash /usr/app/create_env.sh

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "start"]
