const helmet = require('helmet');
const bodyParser = require('body-parser');

module.exports = () => {
  const start = async ({ manifest = {}, app }) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());

    app.get('/__/manifest', (req, res) => res.json(manifest));

    return Promise.resolve();
  };

  return { start };
};
