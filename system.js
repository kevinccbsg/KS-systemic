require('dotenv').config();
const System = require('systemic');
const { join } = require('path');

module.exports = () => new System({ name: 'my-service' })
  .bootstrap(join(__dirname, 'components'));
