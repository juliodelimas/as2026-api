const express = require('express');
const { carts, products } = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

function buildCartResponse(userId) {
  const items = carts[userId] || [];

  const detailedItems = items.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    const unitPrice = product ? product.price : 0;
    const subtotal = Number((unitPrice * item.quantity).toFixed(2));

    return {
      productId: item.productId,
      name: product ? product.name : 'Unknown product',
      unitPrice,
      quantity: item.quantity,
      subtotal,
    };
  });

  const total = Number(
    detailedItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)
  );

  return { items: detailedItems, total };
}

router.get('/cart', authenticate, (req, res) => {
  return res.status(200).json(buildCartResponse(req.user.id));
});

router.post('/cart', authenticate, (req, res) => {
  const { productId, quantity } = req.body || {};
  const parsedProductId = Number(productId);
  const parsedQuantity = Number(quantity);

  if (!Number.isInteger(parsedProductId) || !Number.isInteger(parsedQuantity)) {
    return res.status(400).json({
      error: 'Fields productId and quantity must be integers',
    });
  }

  if (parsedQuantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }

  const product = products.find((entry) => entry.id === parsedProductId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (!carts[req.user.id]) {
    carts[req.user.id] = [];
  }

  const existingItem = carts[req.user.id].find(
    (item) => item.productId === parsedProductId
  );

  if (existingItem) {
    existingItem.quantity += parsedQuantity;
  } else {
    carts[req.user.id].push({
      productId: parsedProductId,
      quantity: parsedQuantity,
    });
  }

  return res.status(200).json({
    message: 'Item added to cart',
    cart: buildCartResponse(req.user.id),
  });
});

module.exports = router;
