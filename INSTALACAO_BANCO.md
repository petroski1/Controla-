# 🗄️ Configuração do Banco PostgreSQL - Controlaê

## Opção 1: Docker (Recomendado)

### 1. Instalar Docker Desktop
1. Acesse: https://www.docker.com/products/docker-desktop/
2. Baixe o Docker Desktop para Windows
3. Execute o instalador e siga as instruções
4. Reinicie o computador após a instalação
5. Abra o Docker Desktop e aguarde inicializar

### 2. Criar Container PostgreSQL
```bash
# Criar container do PostgreSQL
docker run --name postgres-controlae -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=gastos -p 5432:5432 -d postgres:13

# Verificar se está rodando
docker ps

# Ver logs do container
docker logs postgres-controlae
```

### 3. Executar Migrações
```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev --name init

# Visualizar banco (opcional)
npx prisma studio
```

---

## Opção 2: PostgreSQL Local

### 1. Instalar PostgreSQL
1. Acesse: https://www.postgresql.org/download/windows/
2. Baixe o instalador para Windows
3. Execute e siga as instruções
4. **IMPORTANTE:** Anote a senha do usuário postgres

### 2. Configurar Banco
1. Abra o pgAdmin ou psql
2. Crie um banco chamado `gastos`
3. Atualize o arquivo `.env` se necessário:
```
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/gastos?schema=public"
```

### 3. Executar Migrações
```bash
npx prisma migrate dev --name init
```

---

## Opção 3: Banco em Nuvem (Alternativa)

### Supabase (Gratuito)
1. Acesse: https://supabase.com
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a URL de conexão
5. Atualize o `.env`:
```
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
```

---

## ✅ Verificação

Após configurar qualquer opção, teste:

```bash
# Testar conexão
npx prisma db pull

# Ver dados no banco
npx prisma studio
```

---

## 🚀 Próximos Passos

1. **Configurar banco** (escolha uma opção acima)
2. **Executar migrações**
3. **Testar endpoints** com dados reais
4. **Criar usuário de teste**
5. **Testar CRUD de despesas**

---

**💰 Controlaê - Sistema de Controle de Gastos**
