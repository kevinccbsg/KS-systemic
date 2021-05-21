const expect = require('expect.js');
const supertest = require('supertest');
const system = require('../system');

describe('API Test', () => {
  const sys = system();
  let request;
  before(async () => {
    const { app } = await sys.start();
    request = supertest(app);
  });

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
});
