# imagem base node do sistema operacional linux alpine
FROM node:alpine

# definindo diretório de trabalho do container
WORKDIR /app

# copiando package.json para dentro do container
COPY package.json ./

# instalando dependências
RUN npm install

# copiando o restante dos arquivos
COPY . .

# expondo a porta 300 do container
EXPOSE 3000

# buildando aplicação
RUN npm run build

# definindo comando que será execiutado para rodar aplicação no container
CMD ["npm", "start"]
