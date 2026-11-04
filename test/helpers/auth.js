const { expect } = require('chai');
const { api } = require('./api');
const { users } = require('./env');

async function login(email, password) {
  const response = await api()
    .post('/login')
    .send({ email, password });

  expect(response.status).to.equal(200);
  expect(response.body).to.have.property('token').that.is.a('string');

  return response.body.token;
}

async function loginAs(userKey) {
  const user = users[userKey];
  if (!user) {
    throw new Error(`Unknown user key: ${userKey}`);
  }
  return login(user.email, user.password);
}

module.exports = { login, loginAs };
