const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Test api', () => {
  it('test method GET /shiptype', () => {
    request.get('/shiptype').then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);
    });
  });

  it('test method GET /ship', () => {
    request.get('/ship?ship_type=Tug').then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);
    });
  });
})