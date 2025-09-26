# 💰 Controlaê - API de Controle de Gastos

## 🚀 Sistema de Controle de Gastos via WhatsApp

O **Controlaê** é uma plataforma SaaS para controle de gastos pessoais e empresariais, com integração via WhatsApp.

---

## 📋 Endpoints Disponíveis

### 🔐 Autenticação de Usuários

#### POST `/api/users/register`
Cadastra um novo usuário no sistema.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

**Resposta de Sucesso (201):**
```json
{
  "message": "Usuário criado com sucesso!",
  "user": {
    "id": 1,
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "createdAt": "2025-09-26T18:20:00.000Z"
  }
}
```

#### POST `/api/users/login`
Realiza login do usuário e retorna token JWT.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Login realizado com sucesso!",
  "user": {
    "id": 1,
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "createdAt": "2025-09-26T18:20:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 💸 Gestão de Despesas

**⚠️ Todas as rotas de despesas requerem autenticação via token JWT no header:**
```
Authorization: Bearer <seu_token_jwt>
```

#### POST `/api/expenses`
Cria uma nova despesa.

**Body:**
```json
{
  "description": "Mercado",
  "amount": 150.50
}
```

**Resposta de Sucesso (201):**
```json
{
  "message": "Despesa criada com sucesso!",
  "expense": {
    "id": 1,
    "description": "Mercado",
    "amount": 150.50,
    "createdAt": "2025-09-26T18:20:00.000Z",
    "userId": 1,
    "user": {
      "id": 1,
      "email": "usuario@email.com",
      "name": "Nome do Usuário"
    }
  }
}
```

#### GET `/api/expenses`
Lista todas as despesas do usuário autenticado.

**Resposta de Sucesso (200):**
```json
{
  "message": "Despesas listadas com sucesso!",
  "expenses": [...],
  "total": 5
}
```

#### GET `/api/expenses/:id`
Busca uma despesa específica por ID.

#### PUT `/api/expenses/:id`
Atualiza uma despesa existente.

**Body:**
```json
{
  "description": "Supermercado",
  "amount": 200.00
}
```

#### DELETE `/api/expenses/:id`
Remove uma despesa.

**Resposta de Sucesso (200):**
```json
{
  "message": "Despesa excluída com sucesso."
}
```

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js + Express.js
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Tokens)
- **Criptografia:** bcryptjs
- **Ambiente:** Docker (recomendado)

---

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar banco de dados:**
   ```bash
   # Com Docker
   docker run --name postgres-controlae -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=gastos -p 5432:5432 -d postgres:13
   
   # Executar migrações
   npx prisma migrate dev --name init
   ```

3. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

4. **Acessar API:**
   ```
   http://localhost:3000
   ```

---

## 📱 Próximos Passos

- [ ] Integração com WhatsApp API
- [ ] Parser de mensagens de texto
- [ ] Dashboard web
- [ ] Relatórios financeiros
- [ ] Categorização automática de gastos

---

**💰 Controlaê - Controle seus gastos de forma inteligente!**
