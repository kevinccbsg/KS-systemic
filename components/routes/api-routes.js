module.exports = () => {
  const start = async ({ app }) => {
    app.get('/me', (req, res) => {
      const me = {
        firstName: 'Kevin',
        lastName: 'Martinez',
        age: 27,
      };
      res.json(me);
    });

    return Promise.resolve();
  };

  return { start };
};
