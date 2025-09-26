// src/routes/expenseRoutes.js
const express = require('express');
const expenseController = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Todas as rotas de despesas precisam de autenticação
router.use(authenticateToken);

// Rotas CRUD para despesas
router.post('/', expenseController.createExpense);
router.get('/', expenseController.getUserExpenses);
router.get('/:id', expenseController.getExpenseById);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
