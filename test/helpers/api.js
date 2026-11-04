const request = require('supertest');
const { baseUrl } = require('./env');

function api() {
  return request(baseUrl);
}

module.exports = { api };
