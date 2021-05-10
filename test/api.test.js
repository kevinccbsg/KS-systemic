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

  it('"/me" should return 200 (OK)', () => request
    .get('/me')
    .expect(200)
    .then(response => {
      const expected = {
        firstName: 'Kevin',
        lastName: 'Martinez',
        age: 27,
      };
      expect(response.body).to.eql(expected);
    }));
});
