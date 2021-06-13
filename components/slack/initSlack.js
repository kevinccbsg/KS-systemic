const { IncomingWebhook } = require('@slack/webhook');

module.exports = () => {
  const start = async ({ config }) => {
    const webhook = new IncomingWebhook(config.webhookURL);
    return webhook;
  };

  return {
    start,
  };
};
