const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app'); // Adjust the path to your app file
const should = chai.should();

chai.use(chaiHttp);

describe('Inventory Routes', () => {
  it('should allow access to manage inventory for authorized roles', (done) => {
    chai.request(server)
      .get('/inventory/manage')
      .set('Cookie', 'jwt=your-valid-jwt-token-for-employee-or-admin')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.include('Manage Inventory');
        done();
      });
  });

  it('should deny access to manage inventory for unauthorized roles', (done) => {
    chai.request(server)
      .get('/inventory/manage')
      .set('Cookie', 'jwt=your-valid-jwt-token-for-client')
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it('should display vehicle details for a valid vehicle ID', (done) => {
    const validVehicleId = 'valid-vehicle-id'; // Replace with an actual valid vehicle ID
    chai.request(server)
      .get(`/inventory/${validVehicleId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.include('Vehicle Details');
        done();
      });
  });

  it('should return 404 for an invalid vehicle ID', (done) => {
    const invalidVehicleId = 'invalid-vehicle-id';
    chai.request(server)
      .get(`/inventory/${invalidVehicleId}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.text.should.include('Vehicle not found');
        done();
      });
  });
});
