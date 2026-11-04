const express = require('express');
const { carts, products } = require('../db');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const CASH_DISCOUNT_RATE = 0.1;
const VALID_PAYMENT_METHODS = ['cash', 'credit_card'];

router.post('/checkout', authenticate, (req, res) => {
  const { paymentMethod } = req.body || {};

  if (!paymentMethod || !VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    return res.status(400).json({
      error: 'paymentMethod is required and must be "cash" or "credit_card"',
    });
  }

  const cartItems = carts[req.user.id] || [];

  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const items = cartItems.map((item) => {
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

  const subtotal = Number(
    items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)
  );

  const discountRate = paymentMethod === 'cash' ? CASH_DISCOUNT_RATE : 0;
  const discountAmount = Number((subtotal * discountRate).toFixed(2));
  const total = Number((subtotal - discountAmount).toFixed(2));

  carts[req.user.id] = [];

  return res.status(200).json({
    message: 'Checkout completed successfully',
    paymentMethod,
    items,
    subtotal,
    discountRate,
    discountAmount,
    total,
  });
});

module.exports = router;
