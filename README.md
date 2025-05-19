# Mini Insights

Aplicação full-stack para criação e gerenciamento de "insights" (anotações) com autenticação de usuários.

---
## 🛠️ Tecnologias

- **Backend**: Node.js, Express.js, SQLite e JWT
- **Frontend**: React.js (Vite), Axios, React Router, Context API
- **Estilização**: Chakra UI (v2) / CSS
- **Autenticação**: JWT no header `Authorization: Bearer <token>`
- **Notificações**: React Toastify
- **Controle de versão**: Git + Trello para gestão de tarefas

---
## 🚀 Estrutura do Projeto

```
meu-app/                # frontend (Vite + React)
  ├─ index.html
  ├─ package.json
  ├─ vite.config.js
  └─ src/
      ├─ main.jsx
      ├─ index.css
      ├─ App.jsx
      ├─ api/api.js
      ├─ context/AuthContext.jsx
      ├─ components/
      │   ├─ InsightList.jsx
      │   ├─ InsightForm.jsx
      │   ├─ Pagination.jsx
      │   └─ TagFilter.jsx
      └─ pages/
          ├─ Login.jsx
          ├─ Register.jsx
          └─ Dashboard.jsx

backend/               # API (Express + SQLite)
  ├─ src/
  │   ├─ app.js
  │   ├─ db.js
  │   ├─ middleware/auth.js
  │   └─ routes/
  │       ├─ auth.js
  │       └─ insights.js
  └─ schema.sql

.env                   # variáveis de ambiente
README.md              # este arquivo
```

---
## ⚙️ Pré-requisitos

- Node.js (versão LTS)
- npm ou yarn
- Git

---
## 🔧 Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone git@github.com:seu-usuario/mini-insights.git
   cd mini-insights
   ```
2. Crie arquivo `.env` na raiz e adicione:
   ```env
   PORT=3000
   DB_FILE=./db.sqlite
   JWT_SECRET=uma_chave_secreta
   ```

---
## 🏗️ Backend

1. Navegue até a pasta do backend:
   ```bash
   cd backend/src
   ```
2. Instale dependências:
   ```bash
   npm install express sqlite3 bcrypt jsonwebtoken cors body-parser dotenv
   ```
3. Crie o banco e tabelas:
   ```bash
   sqlite3 db.sqlite < ../schema.sql
   ```
4. Inicie o servidor:
   ```bash
   node app.js
   ```
   O servidor estará rodando em `http://localhost:3000`.

---
## 🌐 Frontend

1. Abra um novo terminal na pasta do frontend:
   ```bash
   cd ../meu-app
   ```
2. Instale dependências:
   ```bash
   npm install
   ```
3. Inicie em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   O app abrirá em `http://localhost:3001`.

---
## 🔄 Proxy / CORS

- **Método 1 (CORS)**: no `backend/src/app.js` já está configurado com:
  ```js
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:3001' }));
  ```
- **Método 2 (Proxy Vite)**: em `vite.config.js`:
  ```js
  server: {
    proxy: {
      '/auth': 'http://localhost:3000',
      '/insights': 'http://localhost:3000'
    }
  }
  ```

---
## 📦 Principais Endpoints

### Autenticação

- **POST** `/auth/register`
  - Body: `{ name, email, password }`
  - Retorna: `{ token, user }`

- **POST** `/auth/login`
  - Body: `{ email, password }`
  - Retorna: `{ token, user }`

### Insights (requere JWT no header)

- **POST** `/insights`
  - Body: `{ title, content, tags: string[] }`
  - Cria um novo insight.

- **GET** `/insights`?
  - Query: `page`, `limit`, `tag`
  - Retorna: `{ page, limit, insights: [...] }`

- **GET** `/insights/:id`
  - Retorna o insight especificado.

- **PUT** `/insights/:id`
  - Body: `{ title, content, tags }`
  - Atualiza o insight.

- **DELETE** `/insights/:id`
  - Remove o insight.

---
## 🎨 Design & Estilização

- **Chakra UI** (opcional): para um visual limpo, responsivo e modo escuro/claro.
- **React Toastify**: notificações de sucesso/erro.

---
## 📋 Fluxo de Uso

1. Registre um usuário em **Register**.
2. Faça login em **Login**.
3. No **Dashboard**, crie, edite, delete e filtre insights.

---
## 📖 Convenções de Commit

Usamos **Conventional Commits**:

- `feat: descrição`
- `fix: descrição`
- `chore: descrição`

---
## 🤖 Uso de IA

No Trello, registre as IAs utilizadas:

- **Gemini / Copilot** para gerar boilerplate de rotas e schema SQL.
- **Lovable.ai** para prototipar componentes React.
- **ChatGPT** para documentação e resolução de dúvidas.

---
## 📝 Licença

MIT © Mateus Correia Bezzan
