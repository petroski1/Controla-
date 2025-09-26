// src/services/expenseService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createExpense({ description, amount, userId }) {
  try {
    const newExpense = await prisma.expense.create({
      data: {
        description,
        amount: parseFloat(amount),
        userId: parseInt(userId)
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    return newExpense;
  } catch (error) {
    throw error;
  }
}

async function getUserExpenses(userId) {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    return expenses;
  } catch (error) {
    throw error;
  }
}

async function getExpenseById(expenseId, userId) {
  try {
    const expense = await prisma.expense.findFirst({
      where: { 
        id: parseInt(expenseId),
        userId: parseInt(userId)
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    if (!expense) {
      throw new Error('Despesa não encontrada.');
    }

    return expense;
  } catch (error) {
    throw error;
  }
}

async function updateExpense(expenseId, userId, { description, amount }) {
  try {
    const expense = await prisma.expense.findFirst({
      where: { 
        id: parseInt(expenseId),
        userId: parseInt(userId)
      }
    });

    if (!expense) {
      throw new Error('Despesa não encontrada.');
    }

    const updatedExpense = await prisma.expense.update({
      where: { id: parseInt(expenseId) },
      data: {
        description: description || expense.description,
        amount: amount ? parseFloat(amount) : expense.amount
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    return updatedExpense;
  } catch (error) {
    throw error;
  }
}

async function deleteExpense(expenseId, userId) {
  try {
    const expense = await prisma.expense.findFirst({
      where: { 
        id: parseInt(expenseId),
        userId: parseInt(userId)
      }
    });

    if (!expense) {
      throw new Error('Despesa não encontrada.');
    }

    await prisma.expense.delete({
      where: { id: parseInt(expenseId) }
    });

    return { message: 'Despesa excluída com sucesso.' };
  } catch (error) {
    throw error;
  }
}

module.exports = { 
  createExpense, 
  getUserExpenses, 
  getExpenseById, 
  updateExpense, 
  deleteExpense 
};
