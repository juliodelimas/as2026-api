const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users, carts, getNextUserId } = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'Fields name, email and password are required',
    });
  }

  const existing = users.find(
    (user) => user.email.toLowerCase() === String(email).toLowerCase()
  );

  if (existing) {
    return res.status(409).json({ error: 'Email is already registered' });
  }

  const user = {
    id: getNextUserId(),
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    password: bcrypt.hashSync(String(password), 8),
  };

  users.push(user);
  carts[user.id] = [];

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    message: 'User registered successfully',
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      error: 'Fields email and password are required',
    });
  }

  const user = users.find(
    (entry) => entry.email.toLowerCase() === String(email).toLowerCase()
  );

  if (!user || !bcrypt.compareSync(String(password), user.password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = router;
