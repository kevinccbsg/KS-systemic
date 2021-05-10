const expect = require('expect.js');
const supertest = require('supertest');
const system = require('../system');

describe('API Tests', () => {
  let request;
  const sys = system();

  before(async () => {
    const { app } = await sys.start();
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
      expect(response.body.message).to.eql('age is required');
    }));

  it('"/me" should return 404 (NOT_FOUND)', () => request
    .get('/me')
    .query({ age: 40 })
    .expect(404)
    .then(response => {
      expect(response.body.message).to.eql('I am not old');
    }));
});
