const {
  CustomErrorTypes,
  errorFactory,
  handleHttpError,
  tagError,
} = require('error-handler-module');
const { validateRequest, validateResponse } = require('express-oas-validator');

const badRequestError = errorFactory(CustomErrorTypes.BAD_REQUEST);
const notFoundError = errorFactory(CustomErrorTypes.NOT_FOUND);

module.exports = () => {
  const start = async ({ app, logger, slack }) => {
    /**
     * GET /me
     * @summary my data
     * @tags API
     * @param {number} age.query.required - age filter
     * @return {MeResponse} 200 - basic response
     */
    app.get('/me', validateRequest(), (req, res, next) => {
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
        validateResponse(me);
        return res.json(me);
      } catch (err) {
        return next(tagError(err));
      }
    });

    /**
     * POST /message
     * @summary send message to Slack channel
     * @tags API
     * @param {SlackRequest} request.body.required - songs info - application/json
     * @return {SuccessResponse} 200 - basic response
     */
    app.post('/message', validateRequest(), async (req, res, next) => {
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
