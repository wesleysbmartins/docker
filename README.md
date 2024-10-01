# Docker [![My Skills](https://skillicons.dev/icons?i=docker)](https://skillicons.dev)

Docker é uma plataforma de virtualização leve que permite que desenvolvedores empacotem suas aplicações e todas as suas dependências em contêineres. Esses contêineres são ambientes isolados que garantem que a aplicação rode de forma consistente em qualquer máquina, independentemente do ambiente onde foi desenvolvida. Isso facilita a distribuição, portabilidade e escalabilidade de aplicações.

A containerização resolve o famoso problema de "funciona na minha máquina, mas não no servidor", pois o contêiner encapsula todos os componentes necessários para executar a aplicação, independentemente do sistema operacional ou das configurações locais.

Instale o Docker seguindo a [Documentação](https://www.docker.com/products/docker-desktop/) para conseguir testar as operações a seguir.

### Como o Docker funciona?
Docker funciona criando e gerenciando contêineres a partir de imagens. Vamos entender como isso acontece:

<details>
    <summary>Imagens</summary>
Uma imagem é um modelo imutável que contém tudo o que é necessário para rodar uma aplicação, como o sistema operacional, bibliotecas, dependências e o código da aplicação. As imagens são criadas a partir de um arquivo de configuração chamado Dockerfile, que especifica cada etapa do processo de construção da imagem. Uma imagem é uma espécie de "snapshot" de um sistema configurado.
</details>

<details>
    <summary>Contêineres</summary>
Um contêiner é uma instância de uma imagem em execução. Quando você cria e executa um contêiner, o Docker pega a imagem e a executa como um processo isolado no sistema operacional. Cada contêiner é independente e isolado de outros, mas todos compartilham o mesmo kernel do sistema operacional, o que os torna mais leves que máquinas virtuais (VMs). Enquanto VMs precisam de um sistema operacional completo, os contêineres compartilham o kernel do host, sendo assim muito mais eficientes.
</details>

<details>
    <summary>Volumes</summary>
Volumes são usados para persistência de dados. Diferente dos contêineres, que são efêmeros (ou seja, seus dados são perdidos quando o contêiner é parado ou removido), os volumes permitem que os dados persistam. Eles podem ser usados para armazenar dados fora do contêiner de forma permanente e compartilhar esses dados entre vários contêineres. Os volumes são montados no sistema de arquivos do host e podem ser acessados pelos contêineres.
</details>

<details>
    <summary>Docker Engine</summary>
O Docker Engine é a tecnologia fundamental que cria e gerencia contêineres. Ele é responsável por gerenciar as imagens, criar e controlar os contêineres e lidar com redes e volumes.
</details>

<details>
    <summary>Dockerfile</summary>
O Dockerfile é um arquivo de texto que contém uma série de instruções que o Docker utiliza para construir uma imagem. Cada instrução no Dockerfile executa um comando que define como o container será criado e configurado. Ele permite que você automatize o processo de criação de uma imagem Docker, desde a instalação de dependências até a definição de variáveis de ambiente.

Um Dockerfile é composto por comandos que são interpretados em sequência pelo Docker para criar a imagem. Aqui estão os principais comandos e como eles funcionam:

#### FROM
O comando FROM define a imagem base para o seu container. Toda imagem Docker precisa começar com uma imagem base, que pode ser uma imagem de sistema operacional (como Ubuntu, Alpine) ou outra imagem já existente.
```dockerfile
FROM node:alpine
```
Nesse exemplo, a imagem será baseada no Node.js com o Alpine Linux.

#### WORKDIR
Define o diretório de trabalho dentro do container. Todos os comandos subsequentes serão executados nesse diretório.
```dockerfile
WORKDIR /app
```
Isso cria ou define o diretório /app como o local onde o container trabalhará.

#### COPY
O comando COPY copia arquivos ou diretórios do seu sistema local para o sistema de arquivos do container.
```dockerfile
COPY . /app
```
Esse comando copia todo o conteúdo do diretório atual (pasta onde o Dockerfile está) para o diretório /app dentro do container.

#### RUN
Executa um comando durante o processo de construção da imagem, como instalar pacotes ou configurar o ambiente.
```dockerfile
RUN npm install
```
Aqui, o Docker executará o comando npm install para instalar as dependências do projeto durante a construção da imagem.

#### CMD
O CMD define o comando padrão a ser executado quando um container é iniciado a partir da imagem. O CMD geralmente é usado para especificar o comando de entrada principal do container, como iniciar um servidor.
```dockerfile
CMD ["npm", "start"]
```
Nesse exemplo, quando o container for iniciado, ele executará npm start.

#### EXPOSE
O comando EXPOSE documenta a porta que o container expõe para ser acessível externamente. É uma instrução informativa, mas o mapeamento real das portas deve ser feito na execução (docker run ou docker-compose).
```dockerfile
EXPOSE 3000
```
Isso indica que o serviço dentro do container estará disponível na porta 3000.

#### ENV
Define variáveis de ambiente dentro do container.
```dockerfile
ENV NODE_ENV=production
```
Isso define a variável NODE_ENV como production dentro do container, o que pode influenciar o comportamento da aplicação.

#### ADD
O comando ADD é semelhante ao COPY, mas com mais funcionalidades. Ele pode copiar arquivos locais e também baixar arquivos de URLs externas. Ele também descompacta automaticamente arquivos .tar e .gz.
```dockerfile
ADD config.tar.gz /app/config
```
Esse comando descompactará o arquivo config.tar.gz no diretório /app/config.

#### ENTRYPOINT
O ENTRYPOINT é semelhante ao CMD, mas geralmente usado quando se deseja que a imagem seja usada como um executável específico. Diferente do CMD, ele não pode ser sobrescrito facilmente durante a execução do container.
```dockerfile
ENTRYPOINT ["docker-entrypoint.sh"]
```
Isso define o script docker-entrypoint.sh como o ponto de entrada do container.

#### VOLUME
O comando VOLUME cria um ponto de montagem no container para armazenar dados persistentes. Ele também permite que dados sejam compartilhados entre o host e o container.
```dockerfile
VOLUME /app/data
```
Isso monta o diretório /app/data como um volume que pode ser persistido fora do container.

#### USER
O comando USER especifica o usuário sob o qual o container será executado. Isso é útil para evitar que o container seja executado como root, aumentando a segurança.
```dockerfile
USER node
```
Aqui, o container será executado com o usuário node, em vez de com o usuário root.

#### Exemplo de Dockerfile
Este é um exemplo de um Dockerfile de uma aplicação Back End Node.JS.
```Dockerfile
# imagem base
FROM node:alpine

# diretório de trabalho
WORKDIR /app

# copiar arquivos para dentro do container
COPY package.json ./
COPY . .

# instalar dependências
RUN npm install

# definir variáveis de ambiente
ENV NODE_ENV=production

# expor a porta do serviço
EXPOSE 3000

# definir o comando a ser executado
CMD ["npm", "start"]
```
</details>

<details>
    <summary>CLI</summary>
A CLI do Docker é poderosa e oferece muitos comandos e opções para construir imagens, rodar containers e gerenciar toda a infraestrutura de containers. Vamos detalhar os comandos mais comuns, parâmetros, sua sintaxe e como eles funcionam.

#### Build
O comando **"docker build"** cria uma imagem Docker a partir de um Dockerfile.

```shell
docker build [opções] <caminho>
```
#### Principais opções:
- **-t [nome]:** Define uma tag (nome) para a imagem. Exemplo: docker build -t minha-imagem:1.0 . (o . refere-se ao diretório atual).
- **--file [Dockerfile] ou -f**: Especifica um arquivo Dockerfile em um local diferente. Exemplo: docker build -f Dockerfile.prod ..
- **--no-cache:** Ignora o cache do Docker ao construir a imagem, garantindo que tudo seja refeito. Exemplo: docker build --no-cache -t minha-imagem ..

Exemplo:
```shell
docker build -t node_da_sua_imagem .
```

#### Run
O comando docker run é utilizado para executar um container a partir de uma imagem.
```shell
docker run [opções] <imagem> [comando] [argumentos]
```
#### Principais opções:
- **-d:** Executa o container em segundo plano (modo detached). Exemplo:
```shell
docker run -d nginx
```
- **-p [porta_host]:[porta_container]:** Mapeia uma porta do host para uma porta do container. Exemplo:
```shell
docker run -p 8080:80 nginx
```
- **-v [diretorio_host]:[diretorio_container]:** Monta volumes para persistir dados ou compartilhar arquivos entre o host e o container. Exemplo:
```shell
docker run -v /meus-dados:/dados redis
```
- **--name [nome]:** Atribui um nome ao container, tornando mais fácil a identificação em vez de usar o ID gerado. Exemplo:
```shell
docker run --name meu-container nginx
```
- **--rm:** Remove automaticamente o container após ele ser parado. Exemplo:
```shell
docker run --rm alpine echo "Hello"
```
- **-e [VAR]=[VALOR]:** Define variáveis de ambiente para o container. Exemplo:
```shell
docker run -e "ENV=production" nginx
```
- **--network [nome_da_rede]:** Conecta o container a uma rede específica. Exemplo:
```shell
docker run --network minha-rede nginx
```
- **-it:** Abre um terminal interativo (modo attach) para containers que requerem interação, como Bash. Exemplo:
```shell
docker run -it ubuntu /bin/bash.
```
</details>

<details>
    <summary>Docker Compose</summary>
Docker Compose é uma ferramenta que permite definir e gerenciar múltiplos contêineres Docker como um conjunto de serviços inter-relacionados. Ele é usado para orquestrar contêineres em um ambiente de desenvolvimento ou produção local, permitindo que você defina a arquitetura de sua aplicação em um único arquivo YAML. Com ele, você pode subir, parar e gerenciar todos os serviços de uma aplicação com um único comando, sem precisar gerenciar contêineres manualmente.

O Docker Compose utiliza um arquivo de configuração chamado docker-compose.yml, no qual você descreve os contêineres que compõem sua aplicação, suas dependências, redes, volumes, variáveis de ambiente, portas e outras configurações necessárias para o funcionamento do sistema.

O fluxo de trabalho do Docker Compose geralmente segue estas etapas:

- Definir serviços no arquivo docker-compose.yml, cada serviço é um contêiner, como um banco de dados, servidor web, etc.

- Subir e executar todos os serviços com um único comando: docker-compose up.

- Gerenciar os contêineres interligados de forma centralizada, permitindo controle de ciclo de vida, rede e volumes persistentes.

#### Estrutura do Arquivo docker-compose.yml
O arquivo docker-compose.yml é o coração do Docker Compose. Ele permite que você defina como os contêineres da sua aplicação interagem entre si, especificando detalhes como a imagem a ser usada, portas expostas, volumes montados, variáveis de ambiente, entre outros. Vou explicar a estrutura do arquivo de maneira didática e simples, com exemplos práticos para facilitar a compreensão.

Um arquivo docker-compose.yml é estruturado em três partes principais:

### Version
Define a versão do Docker Compose. A versão 3 é uma das mais comuns e compatíveis com várias versões do Docker. Ela introduziu suporte para redes, volumes e uma maior compatibilidade com orquestradores como o Kubernetes.
```yaml
version: '3'
```

### Services
Esta é a parte mais importante do arquivo. Cada serviço é um contêiner Docker que será criado e gerenciado pelo Compose.

Cada serviço pode ter configurações como:

#### Image
```yaml
image: node:14
```
Define a imagem Docker a ser usada. Neste caso, o Docker vai baixar a imagem oficial node:14 do Docker Hub e rodar o contêiner com ela.

#### Ports
```yaml
ports:
  - "3000:3000"
```
Mapeia portas entre o contêiner e o host. No exemplo, a porta 3000 no contêiner é mapeada para a porta 3000 no host, permitindo que a aplicação Node.js seja acessada via navegador no localhost:3000.

#### Volumes
```yaml
volumes:
  - .:/usr/src/app
```
Monta volumes no contêiner. No exemplo, o diretório atual do host (.) será montado dentro do contêiner no caminho /usr/src/app, permitindo que você modifique arquivos no host e veja as mudanças imediatamente no contêiner (útil para desenvolvimento).

#### Environment
```yaml
environment:
  - NODE_ENV=development
```
Define variáveis de ambiente para o contêiner. Aqui, estamos configurando a variável NODE_ENV como development, que será usada pelo Node.js dentro do contêiner para rodar em modo de desenvolvimento.

#### Depends_On
```yaml
depends_on:
  - db
```
Indica que o serviço app depende do serviço db. Isso significa que o banco de dados será iniciado primeiro, e só depois o serviço app será iniciado. No entanto, vale notar que o depends_on apenas gerencia a ordem de inicialização dos contêineres, mas não garante que o banco de dados esteja pronto para uso — você pode precisar de scripts para verificar a disponibilidade.


### Volumes
```yaml
volumes:
  dbdata:
```
Define um volume nomeado dbdata. Esse volume será usado para persistir os dados do banco de dados MySQL, garantindo que os dados não sejam perdidos quando o contêiner for parado ou removido.

Aqui está um exemplo básico para ilustrar:
```yml
version: '3'
services:
  app: # serviço app node
    image: node
    ports:
      - "3000:3000" # rodando na porta 3000
    volumes:
      - .:/usr/src/app # caminho do volume
    environment:
      - NODE_ENV=development # variavel de ambiente node_env
    depends_on:
      - db # este serviço (app node) depende do serviço db

  db: # serviço db (banco de dados mysql)
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword # senha do banco
      MYSQL_DATABASE: mydb # nome do banco
    ports:
      - "3306:3306" # porta
    volumes:
      - dbdata:/var/lib/mysql # volume do banco

volumes:
  dbdata: # criando volume para estas aplocações
```

Para rodar seu docker_compose.yml basta executar em seu terminal:
```shell
docker_compose up
```
Para parar seus containers:
```shell
docker_compose down
```
</details>

Neste repositório existe duas aplicações que servem como teste, ambas tem seu Dockerfile e seu docker_compose, uma delas desenvolvida em NodeJs e outra em Golang. Elas executam a mesma tarefa, testa a comunicação entre um banco de dados e a aplicação, exibindo a mensagem de sucesso ou de falha, explore os Dockerfiles e docker_compose das duas e obtenha mais detalhes, teste e entenda como funciona.