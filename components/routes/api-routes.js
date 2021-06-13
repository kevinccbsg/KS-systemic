const {
  CustomErrorTypes,
  errorFactory,
  handleHttpError,
  tagError,
} = require('error-handler-module');

const badRequest = errorFactory(CustomErrorTypes.BAD_REQUEST);

module.exports = () => {
  const start = async ({ app, logger, slack }) => {
    app.get('/me', (req, res, next) => {
      try {
        const me = {
          firstName: 'kevin',
          age: 27,
        };
        if (req.query.age > 27) {
          throw badRequest('I am not old');
        }
        logger.info('Hellooo');
        return res.json(me);
      } catch (error) {
        return next(tagError(error));
      }
    });

    app.post('/message', async (req, res, next) => {
      try {
        await slack.send({
          text: '@victor --',
        });
        return res.json({ success: true });
      } catch (error) {
        return next(tagError(error));
      }
    });

    app.use(handleHttpError(logger));

    return Promise.resolve();
  };

  return { start };
};
