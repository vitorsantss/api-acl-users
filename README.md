# API de Controle de Acesso e Usuários

Este é um projeto de API desenvolvido em Node.js utilizando o framework Express e o ORM Prisma para interação com o banco de dados. A API é voltada para controle de acesso, gerenciamento de usuários, permissões e papéis (roles).

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework para construção de APIs RESTful.
- **Prisma**: ORM (Object-Relational Mapping) para Node.js, utilizado para interação com o banco de dados.
- **bcryptjs**: Biblioteca para criptografar senhas.
- **jsonwebtoken**: Implementação de JSON Web Tokens (JWT) para autenticação.
- **nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.
- **eslint**: Ferramenta de linting para manter um código consistente.

## Como Executar

1. Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/backend.git
```
2. Acesse o diretório do projeto:

```bash
cd api-acl-users
```

3. Instale as dependências:

```bash
npm install
```

4. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

```bash
PORT=you_port
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
ROOT_EMAIL=root@example.com
ROOT_PASSWORD=root_password
```
Substitua your_secret_key pelo segredo usado para assinar os tokens JWT, 
your_database_url pela URL de conexão com o banco de dados, 
root@example.com pelo email do usuário root, e root_password pela senha do usuário root.

5. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

6. Execute o seed para popular o banco com dados iniciais:

```bash
npm run prisma:seed
```

7. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O servidor estará acessível em http://localhost:3000, ou na porta especificada no .env

## Rotas Disponíveis

### Autenticação:

- **POST /auth/login:** Rota para autenticar um usuário e obter um token JWT.

### Usuários:

- **GET /users:** Listar todos os usuários.
- **GET /users/:id:** Obter detalhes de um usuário.
- **POST /users:** Criar um novo usuário.
- **PUT /users/:id:** Atualizar informações de um usuário.
- **DELETE /users/:id:** Excluir um usuário.

### Permissões:

- **GET /permission:** Listar todas as permissões.
- **GET /permission/:id:** Obter detalhes de uma permissão.
- **POST /permission:** Criar uma nova permissão.
- **PUT /permission/:id:** Atualizar uma permissão.
- **DELETE /permission/:id:** Excluir uma permissão.

### Papéis (Roles):

- **GET /roles:** Listar todos os papéis.
- **GET /roles/:id:** Obter detalhes de um papel.
- **POST /roles:** Criar um novo papel.
- **PUT /roles/:id:** Atualizar um papel.
- **DELETE /roles/:id:** Excluir um papel.

### Segurança:

- **POST /seguranca/acl:** Adicionar Controle de Acesso (ACL) para um usuário.
- **POST /seguranca/permissions-roles:** Adicionar permissões a um papel.

### Controle de Acesso:

Diversas rotas contam com middleware de controle de acesso, exigindo permissões ou papéis específicos.

## Tratamento de Erros

A API possui um sistema de tratamento de erros eficiente para proporcionar respostas consistentes. O "error handler" centralizado garante mensagens claras e códigos de status HTTP adequados em diferentes cenários.

### Exemplos de Erros

- **404 - Não Encontrado:** Recurso não existente.
- **401 - Não Autorizado:** Falta de permissão para acessar uma rota.
- **500 - Erro Interno do Servidor:** Situações inesperadas ou falhas no processamento.

## Conclusão
O projeto é uma API bem estruturada, utilizando tecnologias como Express, Prisma e JWT. Destaca-se pela eficiente implementação de autenticação, controle de permissões e tratamento consistente de erros. A documentação detalhada e a organização do código facilitam a manutenção e escalabilidade. Em resumo, o projeto representa um exemplo prático de uma API robusta e segura.

