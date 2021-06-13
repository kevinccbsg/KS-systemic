const { spy } = require('sinon');

module.exports = () => {
  const start = async () => {
    console.log('INIT MOCK');
    return {
      send: spy(),
    };
  };

  return { start };
};
