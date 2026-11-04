const { api } = require('./api');

async function checkout(token, paymentMethod) {
  return api()
    .post('/checkout')
    .set('Authorization', `Bearer ${token}`)
    .send({ paymentMethod });
}

module.exports = { checkout };
