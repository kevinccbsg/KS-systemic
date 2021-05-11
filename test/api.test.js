const expect = require('expect.js');
const supertest = require('supertest');
const { assert } = require('sinon');
const system = require('../system');
const initSlack = require('./mocks/slackSystem');

describe('API Tests', () => {
  let request;
  let slackSystem;
  let sys = system();
  sys = sys.set('slack', initSlack()).dependsOn();

  before(async () => {
    const { app, slack } = await sys.start();
    slackSystem = slack;
    request = supertest(app);
  });

  after(() => sys.stop());

  it('"/hello-world" should return 200 (OK)', () => request
    .get('/hello-world')
    .expect(200));

  it('"/me" should return 400 (BAD_REQUEST) if we do not send age', () => request
    .get('/me')
    .expect(400)
    .then(response => {
      expect(response.body.message).to.eql('Required error: age query param is required.');
    }));

  it('"/me" should return 404 (NOT_FOUND)', () => request
    .get('/me')
    .query({ age: 40 })
    .expect(404)
    .then(response => {
      expect(response.body.message).to.eql('I am not old');
    }));

  it('"/message" should return 200 (OK) and send a message', () => {
    const expectedMessage = 'sending message';
    return request
      .post('/message')
      .send({ message: expectedMessage })
      .expect(200)
      .then(response => {
        expect(response.body.success).to.eql(true);
        assert.calledWith(slackSystem.send, {
          text: expectedMessage,
        });
      });
  });

  it('"/message" should return 400 (BAD_REQUEST) when we send an invalid response', () => request
    .post('/message')
    .send({ message: false })
    .expect(400)
    .then(response => {
      expect(response.body.message).to.eql('Error in request: Schema SlackRequest/properties/message must be string. You provide "{"message":false}"');
    }));
});
