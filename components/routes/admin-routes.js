const helmet = require('helmet');
const bodyParser = require('body-parser');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const { init: initializeExpressValidator } = require('express-oas-validator');

module.exports = () => {
  const start = async ({ manifest = {}, app, config }) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());

    const instance = expressJSDocSwagger(app)(config.openAPIOptions);

    instance.on('finish', data => {
      initializeExpressValidator(data);
    });

    /**
     * GET /hello-world
     * @tags API
     * @summary basic route
     * @return {string} 200 - basic response - text/html
     */
    app.get('/hello-world', (req, res) => {
      res.send('hello world');
    });

    /**
     * GET /__/manifest
     * @summary basic route
     * @tags ADMIN
     * @tag admin
     * @return {object} 200 - manifest response
     */
    app.get('/__/manifest', (req, res) => res.json(manifest));

    return Promise.resolve();
  };

  return { start };
};
