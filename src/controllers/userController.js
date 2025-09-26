// src/controllers/userController.js
const userService = require('../services/userService');
const authService = require('../services/authService');

async function registerUser(req, res) {
  const { email, password, name } = req.body;

  // Validação básica
  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const newUser = await userService.createUser({ email, password, name });
    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: newUser
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  // Validação básica
  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const result = await authService.loginUser({ email, password });
    res.status(200).json({
      message: 'Login realizado com sucesso!',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = { registerUser, loginUser };
