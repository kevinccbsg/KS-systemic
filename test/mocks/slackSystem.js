const { spy } = require('sinon');

module.exports = () => {
  const start = async () => ({
    send: spy(),
  });

  return { start };
};
