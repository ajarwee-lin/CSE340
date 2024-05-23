const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); // Adjust the path to your app file
const should = chai.should();

chai.use(chaiHttp);

describe('Authentication', () => {
  it('should log in a user and set a JWT token', (done) => {
    chai.request(server)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });

  it('should not allow access to restricted routes without a valid token', (done) => {
    chai.request(server)
      .get('/inventory/manage')
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it('should allow access to restricted routes with a valid token', (done) => {
    chai.request(server)
      .post('/login')
      .send({ email: 'admin@example.com', password: 'adminpassword' })
      .end((err, res) => {
        const token = res.body.token;
        chai.request(server)
          .get('/inventory/manage')
          .set('Cookie', `jwt=${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
});
