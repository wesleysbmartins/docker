# imagem base golang do sistema operacional linux alpine
FROM nevsnode/golang-alpine

# definindo diretório de trabalho do container
WORKDIR /app

# copiando todos os arquivos
COPY . .

# instalando dependências
RUN go mod download

# expondo a porta 300 do container
EXPOSE 3000

# definindo comando que será executado para rodar aplicação no container
CMD ["go", "run", "main.go"]
