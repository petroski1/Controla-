// src/controllers/expenseController.js
const expenseService = require('../services/expenseService');

async function createExpense(req, res) {
  const { description, amount } = req.body;
  const userId = req.user.userId;

  // Validação básica
  if (!description || !amount) {
    return res.status(400).json({ error: 'Descrição e valor são obrigatórios.' });
  }

  if (isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).json({ error: 'Valor deve ser um número positivo.' });
  }

  try {
    const newExpense = await expenseService.createExpense({ 
      description, 
      amount, 
      userId 
    });
    
    res.status(201).json({
      message: 'Despesa criada com sucesso!',
      expense: newExpense
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUserExpenses(req, res) {
  const userId = req.user.userId;

  try {
    const expenses = await expenseService.getUserExpenses(userId);
    res.status(200).json({
      message: 'Despesas listadas com sucesso!',
      expenses,
      total: expenses.length
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getExpenseById(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const expense = await expenseService.getExpenseById(id, userId);
    res.status(200).json({
      message: 'Despesa encontrada!',
      expense
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function updateExpense(req, res) {
  const { id } = req.params;
  const { description, amount } = req.body;
  const userId = req.user.userId;

  if (amount && (isNaN(amount) || parseFloat(amount) <= 0)) {
    return res.status(400).json({ error: 'Valor deve ser um número positivo.' });
  }

  try {
    const updatedExpense = await expenseService.updateExpense(id, userId, { 
      description, 
      amount 
    });
    
    res.status(200).json({
      message: 'Despesa atualizada com sucesso!',
      expense: updatedExpense
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteExpense(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const result = await expenseService.deleteExpense(id, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = { 
  createExpense, 
  getUserExpenses, 
  getExpenseById, 
  updateExpense, 
  deleteExpense 
};
