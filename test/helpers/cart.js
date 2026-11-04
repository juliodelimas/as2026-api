const { expect } = require('chai');
const { api } = require('./api');

async function addToCart(token, productId, quantity) {
  const response = await api()
    .post('/cart')
    .set('Authorization', `Bearer ${token}`)
    .send({ productId, quantity });

  expect(response.status).to.equal(200);
  expect(response.body).to.have.property('cart');

  return response.body.cart;
}

module.exports = { addToCart };
