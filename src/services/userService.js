// src/services/userService.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createUser({ email, password, name }) {
  try {
    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Remove a senha do objeto antes de retorná-lo
    delete newUser.password;
    return newUser;

  } catch (error) {
    // Trata erro de e-mail duplicado
    if (error.code === 'P2002') {
      throw new Error('Este e-mail já está em uso.');
    }
    throw error;
  }
}

module.exports = { createUser };
