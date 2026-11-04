const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    name: 'Alice Santos',
    email: 'alice@example.com',
    password: bcrypt.hashSync('alice123', 8),
  },
  {
    id: 2,
    name: 'Bob Oliveira',
    email: 'bob@example.com',
    password: bcrypt.hashSync('bob123', 8),
  },
  {
    id: 3,
    name: 'Carol Souza',
    email: 'carol@example.com',
    password: bcrypt.hashSync('carol123', 8),
  },
];

const products = [
  {
    id: 1,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with USB receiver',
    price: 49.9,
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    price: 129.9,
  },
  {
    id: 3,
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI and SD card reader',
    price: 89.9,
  },
];

/** @type {Record<number, Array<{ productId: number, quantity: number }>>} */
const carts = {
  1: [],
  2: [],
  3: [],
};

let nextUserId = 4;

module.exports = {
  users,
  products,
  carts,
  getNextUserId: () => nextUserId++,
};
