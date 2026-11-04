const { expect } = require('chai');
const discountData = require('../data/checkout-discount.json');
const { loginAs } = require('../helpers/auth');
const { addToCart } = require('../helpers/cart');
const { checkout } = require('../helpers/checkout');

describe('Checkout module — discount business rule (Equivalence Partitioning)', function () {
  this.timeout(10000);

  const { cartFixture, cases } = discountData;

  cases.forEach((testCase) => {
    it(`${testCase.id} — ${testCase.partition}: ${testCase.description}`, async function () {
      const token = await loginAs(testCase.user);
      await addToCart(token, cartFixture.productId, cartFixture.quantity);

      const response = await checkout(token, testCase.paymentMethod);

      expect(response.status).to.equal(testCase.expectedStatus);

      if (testCase.expectedStatus === 200) {
        expect(response.body.paymentMethod).to.equal(testCase.paymentMethod);
        expect(response.body.subtotal).to.equal(cartFixture.subtotal);
        expect(response.body.discountRate).to.equal(testCase.expected.discountRate);
        expect(response.body.discountAmount).to.equal(testCase.expected.discountAmount);
        expect(response.body.total).to.equal(testCase.expected.total);
        return;
      }

      expect(response.body).to.have.property('error').that.is.a('string');
      expect(response.body.error.toLowerCase()).to.include(
        testCase.expected.errorContains.toLowerCase()
      );
      expect(response.body).to.not.have.property('discountRate');
      expect(response.body).to.not.have.property('total');
    });
  });
});
