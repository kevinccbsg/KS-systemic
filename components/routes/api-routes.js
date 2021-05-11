const {
  CustomErrorTypes,
  errorFactory,
  handleHttpError,
  tagError,
} = require('error-handler-module');

const badRequestError = errorFactory(CustomErrorTypes.BAD_REQUEST);
const notFoundError = errorFactory(CustomErrorTypes.NOT_FOUND);

module.exports = () => {
  const start = async ({ app, logger, slack }) => {
    app.get('/me', (req, res, next) => {
      try {
        const me = {
          firstName: 'Kevin',
          lastName: 'Martinez',
          age: 27,
        };
        if (!req.query.age) {
          throw badRequestError('age is required');
        }
        if (me.age < req.query.age) {
          throw notFoundError('I am not old');
        }
        return res.json(me);
      } catch (err) {
        return next(tagError(err));
      }
    });

    app.post('/message', async (req, res, next) => {
      try {
        await slack.send({
          text: req.body.message,
        });
        return res.json({ success: true });
      } catch (err) {
        return next(tagError(err));
      }
    });

    app.use(handleHttpError(logger));

    return Promise.resolve();
  };

  return { start };
};
