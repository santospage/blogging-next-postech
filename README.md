# APP Blogging

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

## Resumo do projeto

Projeto de APP desenvolvido em NEXT.JS para um Blogging de Aulas com sistema de cadastro e manutenção de usuários, categorias e aulas ministradas.

## Stack utilizada

- `next` v14.2.13
- `react` v18.0.0
- `react-dom"` v18.0.0
- `react-hook-form` v7.53.0
- `react-icons` v5.3.0
- `react-router-dom` v6.26.2
- `react-toastify` v10.0.5
- `formik` v2.4.6
- `node-fetch` v3.3.2
- `nookies` v2.5.2
- `tailwindcss/aspect-ratio` v0.4.2
- `tailwindcss/forms` v0.5.9
- `tailwindcss/typography` v0.5.15
- `cors` v2.8.5
- `date-fns` v4.1.0
- `sharp` v0.33.5

## Pré-Requisitos

A utilização deste APP depende de um backend para fornecer as APIs necessárias, incluindo a lógica de negócio e a comunicação com o banco de dados.

Antes de rodar este projeto, é essencial que o backend esteja instalado e configurado corretamente.

A documentação completa sobre a instalação, configuração e execução do backend está disponível no repositório:
https://github.com/santospage/blogging-express-postech

## Instalação

Este projeto já conta com o código necessário para subir o APP em um servidor local:

```
├── .github
│   └── workflows
│       ├── pre-push.yaml
│       └── unit-tests-pr.yaml
├── src
│   ├── app
│   │   ├── category
│   │   │   ├── form
│   │   │   │   └── [id]
│   │   │   │       └── page.tsx
│   │   │   ├── list
│   │   │   │   └── page.tsx
│   │   │   └── category.module.css
│   │   ├── classroom
│   │   │   ├── form
│   │   │   │   └── [id]
│   │   │   │       └── page.tsx
│   │   │   ├── list
│   │   │   │   └── page.tsx
│   │   │   └── category.module.css
│   │   ├── components
│   │   │   ├── Categories
│   │   │   │   ├── Classes.tsx
│   │   │   │   ├── ClassRoom.tsx
│   │   │   │   └── categories.module.css
│   │   │   ├── Classes
│   │   │   │   ├── Categories.tsx
│   │   │   │   ├── Category.tsx
│   │   │   │   └── classes.module.css
│   │   ├── footer
│   │   │   ├── page.tsx
│   │   │   └── footer.module.css
│   │   ├── header
│   │   │   ├── page.tsx
│   │   │   └── header.module.css
│   │   ├── login
│   │   │   ├── page.tsx
│   │   │   └── login.module.css
│   │   ├── logout
│   │   │   ├── page.tsx
│   │   │   └── logout.module.css
│   │   ├── user
│   │   │   ├── form
│   │   │   │   └── [id]
│   │   │   │       └── page.tsx
│   │   │   ├── list
│   │   │   │   └── page.tsx
│   │   │   └── user.module.css
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   ├── not-found.module.css
│   │   ├── not-found.tsx
│   │   ├── page.module.css
│   │   ├── page.tsx
│   │   ├── context
│   │   │   └── CategoryContext.tsx
│   │   ├── infra
│   │   │   └── HttpClient
│   │   │       └── HttpClient.tsx
│   │   ├── models
│   │   │   ├── Categories
│   │   │   │   └── Categories.ts
│   │   │   ├── Classes
│   │   │   │   └── Classes.ts
│   │   │   ├── Login
│   │   │   │   └── Login.ts
│   │   │   └── Users
│   │   │       └── Users.ts
│   │   ├── services
│   │   │   ├── Auth
│   │   │   │   ├── AuthService.tsx
│   │   │   │   └── TokenService.tsx
│   │   │   ├── Categories
│   │   │   │   └── CategoryService.tsx
│   │   │   ├── Classes
│   │   │   │   └── ClassRoomService.tsx
│   │   │   └── Users
│   │   │       └── UserService.tsx
├── tests
│   ├── app
│   │   ├── category
│   │   │   ├── form
│   │   │   │   └── page.spec.tsx
│   │   │   └── list
│   │   │       └── page.spec.tsx
│   │   ├── classroom
│   │   │   ├── form
│   │   │   │   └── page.spec.tsx
│   │   │   └── list
│   │   │       └── page.spec.tsx
│   │   ├── footer
│   │   │   └── page.spec.tsx
│   │   ├── header
│   │   │   └── page.spec.tsx
│   │   ├── login
│   │   │   └── page.spec.tsx
│   │   ├── logout
│   │   │   └── page.spec.tsx
│   │   ├── user
│   │   │   ├── form
│   │   │   │   └── page.spec.tsx
│   │   │   └── list
│   │   │       └── page.spec.tsx
│   │   ├── layout.spec.tsx
│   │   ├── not-found.spec.tsx
│   │   ├── page.spec.tsx
│   │   ├── context
│   │   │   └── CategoryContext.spec.tsx
│   │   ├── services
│   │   │   ├── Auth
│   │   │   │   └── AuthService.spec.tsx
│   │   │   ├── Categories
│   │   │   │   └── CategoryService.spec.tsx
│   │   │   ├── Classes
│   │   │   │   └── ClassRoomService.spec.tsx
│   │   │   └── Users
│   │   │       └── UserService.spec.tsx
├── .editorconfig
├── .env
├── .env_example
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── jest.setup.js
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

### Instalação do projeto

O projeto está pronto para ser executado em um ambiente Docker. Por este motivo, será necessária apenas a instalação do Docker, não sendo necessária a instalação manual do projeto via
`npm install`.

Caso não tenha o Docker instalado, siga as instruções para seu sistema operacional na [documentação oficial do Docker](https://docs.docker.com/get-docker/).

Para executar em ambiente de desenvolvimento:

- Faça o `fork` e `clone` deste repositório em seu computador;
- Entre no diretório local onde o repositório foi clonado;
- Utilize o comando `sudo docker-compose up` para "build" e subir o servidor local e expor a porta 3001 em `localhost`.

## Como rodar o APP

O comando `sudo docker-compose up` já fará o processo de instalar e subir o APP em modo de desenvolvimento. Você deverá ver no terminal a seguinte mensagem:

```
 ✔ Container blogging-next  Created                                                                                                                               0.0s
Attaching to blogging-next
blogging-next  |
blogging-next  | > blogging-next-test@0.1.0 dev
blogging-next  | > next dev
blogging-next  |
blogging-next  |   ▲ Next.js 14.2.13
blogging-next  |   - Local:        http://localhost:3000
blogging-next  |   - Environments: .env
blogging-next  |
blogging-next  |  ✓ Starting...
blogging-next  |  ✓ Ready in 3.2s
```

> **IMPORTANTE:** Este APP está programado para ser acessada a partir de `http://localhost:3001`. Certifique-se de que não existem outros recursos ocupando a porta `3001` antes de subir o projeto.

### Funcionalidades

Este APP disponibiliza as seguintes funcionalidades a partir da URL\_ `localhost:3001/blogging`:

`/`
`Home contendo a lista de aulas disponíveis e filtros`

`/classroom`
`Exibe detalhes sobre a aula selecionada`

`/login`
`Possibilita identificação do usuário através de user e password`

`/logout`
`Desconeta o usuário identificado na opção login`

`/user/list`
`Lista todos os usuários cadastrados para utilização do sistema`

`/user/form`
`Possibilita a realização do CRUD de usuários no sistema`

`/categories/list`
`Lista todos as categorias cadastradas para classificação das aulas`

`/categories/form`
`Possibilita a realização do CRUD de categorias no sistema`

`/classes/list`
`Lista todos as aulas cadastradas no sistema`

`/classes/form`
`Possibilita a realização do CRUD de aulas no sistema`

## Observações

A lista de aulas disponíveis e seus detalhes poderão ser acessadas livremente, sem a necessidade de identifficação do usuário, as demais funcionalidades exigem login de usuário cadastrado.

Usuário padrão pré-cadastrado:
`User: professor`
`Password: 123456`

![Blogging](https://drive.google.com/uc?export=view&id=1tGgjFGA1vcMDSGEG7gkC9htsDCqvqDhj)

![Detail](https://drive.google.com/uc?export=view&id=1C3rT_ewHgePx0bNNSExnPyeEfoNRSKnO)

![Classes](https://drive.google.com/uc?export=view&id=1Z_tPSKEPc8E0s1qMXyQX47meX9KaVJxH)

![ClassRoom](https://drive.google.com/uc?export=view&id=1AaBFaicsl4NUgWZjB_na3PikpzctxtTH)
