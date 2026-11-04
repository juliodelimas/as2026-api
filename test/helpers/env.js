const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

module.exports = {
  baseUrl: required('BASE_URL'),
  users: {
    alice: {
      email: required('USER_ALICE_EMAIL'),
      password: required('USER_ALICE_PASSWORD'),
    },
    bob: {
      email: required('USER_BOB_EMAIL'),
      password: required('USER_BOB_PASSWORD'),
    },
    carol: {
      email: required('USER_CAROL_EMAIL'),
      password: required('USER_CAROL_PASSWORD'),
    },
  },
};
