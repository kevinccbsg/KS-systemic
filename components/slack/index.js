const System = require('systemic');
const initSlack = require('./initSlack');

module.exports = new System({ name: 'slack' })
  .add('slack', initSlack())
  .dependsOn('config');
