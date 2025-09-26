# Configuração do Banco de Dados PostgreSQL

## Status Atual
✅ Estrutura do projeto criada  
✅ Dependências instaladas  
✅ Servidor Express configurado  
✅ Prisma configurado  
✅ Endpoint de cadastro criado  
❌ Banco PostgreSQL não está rodando  

## Próximos Passos para Configurar o Banco

### Opção 1: Docker (Recomendado)
```bash
# Criar um container PostgreSQL
docker run --name postgres-gastos -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=gastos -p 5432:5432 -d postgres:13

# Verificar se está rodando
docker ps
```

### Opção 2: PostgreSQL Local
1. Instalar PostgreSQL no Windows
2. Criar um banco chamado "gastos"
3. Usuário: postgres, Senha: docker

### Após Configurar o Banco
```bash
# Executar a migração
npx prisma migrate dev --name init

# Testar o endpoint
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","password":"senhaSuperSegura123","name":"Usuário Teste"}'
```

## Endpoints Disponíveis

### POST /api/users/register
Cadastra um novo usuário

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
  "id": 1,
  "email": "usuario@email.com",
  "name": "Nome do Usuário",
  "createdAt": "2025-09-26T18:20:00.000Z"
}
```

**Resposta de Erro (400):**
```json
{
  "error": "Este e-mail já está em uso."
}
```

## Estrutura do Projeto
```
src/
├── controllers/
│   └── userController.js    # Lógica das rotas de usuário
├── routes/
│   └── userRoutes.js        # Definição das rotas
├── services/
│   └── userService.js       # Lógica de negócio
├── config/                  # Configurações futuras
└── index.js                 # Servidor principal
```
