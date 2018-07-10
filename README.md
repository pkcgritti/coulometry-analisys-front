# Aplicativo para automatização de ensaios coulométricos.

## Backend

O backend utiliza node.js e foi escrito em typescript, utilizando mongodb como base
de dados. Para instalar o backend no linux, siga os seguintes passos:

```bash
# Instalação do nodemon (para executar o servidor com hot-reload)
npm i -g nodemon
# Instalação do ts-node (utilizado pelo nodemon para iniciar o server typescript com hot-reload)
npm i -g ts-node
# Instalação do compilador typescript, utilizado para produção
npm i -g typescript

# Navegue até o diretório do projeto
cd ~/path-to-this-repo/backend/
# e instale as dependências
npm i

# Para rodar o servidor em modo dev, utilize:
nodemon

# Para gerar o código de produção, utilize:
tsc
```

## Frontend

Linguagem: Javascript (ECMA6) + pug(.html) + stylus(.css)
Frameworks: Vue.js + Vuetify + webpack
Documentação sob desenvolvimento.

## Microserviço (Detecção de pontos de inflexão)

Linguagem: Python
Frameworks: Flask
Dependências: Numpy, Flask, Urllib
Documentação sob desenvolvimento.
