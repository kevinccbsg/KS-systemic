const { assert } = require('sinon');
const expect = require('expect.js');
const supertest = require('supertest');
const system = require('../system');
const initSlack = require('./mocks/slackSystem');

describe('API Test', () => {
  let sys = system();
  let request;
  let slackSystem;
  sys = sys.set('slack', initSlack()).dependsOn();
  before(async () => {
    const { app, slack } = await sys.start();
    slackSystem = slack;
    request = supertest(app);
  });

  afterEach(() => {
    slackSystem.send.resetHistory();
  });

  after(() => sys.stop());

  it('"/me" should return 200 (OK)', () => request
    .get('/me')
    .expect(200)
    .then(response => {
      const expected = {
        firstName: 'kevin',
        age: 27,
      };
      expect(response.body).to.eql(expected);
    }));

  it('"/me" should return 400 (BAD_REQUEST) when age is bigger than 27', () => request
    .get('/me')
    .query({ age: 40 })
    .expect(400));

  it('"/messages" return 200 (OK)', () => (
    request.post('/message')
      .expect(200)
      .then(() => {
        assert.calledOnceWithExactly(slackSystem.send, {
          text: '@victor --',
        });
      })
  ));

  it('"/messages" return 200 (OK)', () => (
    request.post('/message')
      .expect(200)
      .then(() => {
        assert.calledOnceWithExactly(slackSystem.send, {
          text: '@victor --',
        });
      })
  ));
});
