const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// Middleware para parse de JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: "🚀 Controlaê - API de Controle de Gastos no ar!",
    logo: "💰 Controlaê",
    description: "Sistema de controle de gastos via WhatsApp",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      expenses: "/api/expenses"
    }
  });
});

// Use um prefixo para as rotas da API
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

// Definir a porta
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Controlaê - Servidor rodando na porta ${PORT}`);
  console.log(`💰 Sistema de Controle de Gastos ativo!`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
  console.log(`📱 API pronta para integração com WhatsApp!`);
});
