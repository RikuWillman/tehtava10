/*
REST-Apin yksinkertainen perustestaus
Serveri pitää ensin käynnistää komennolla: npm start
Käynnistä serveri ensimmäisessä komentokehotteessa
Sen jälkeen: npm test toisessa komentokehotteessa
Apitesti Opiskelija ei tallennu kantaan jos se on jo siellä,
joten poista se ennen testiä.
*/

const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;
chai.use(chaihttp);
const apiteststudent = require('./apiteststudent.json'); //lähetettävä data

describe('Testing Server API', () => { 

  // Post -reitin testaus
  it('it should post a student from /students', (done) => {
    chai
      .request('http://localhost:3000')
      .post('/students')
      .send(apiteststudent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  it('should get students from /students', (done) => {
    chai
      .request('http://localhost:3000')
      .get('/students')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).not.to.be.eql(0);
        expect(res.body[0]).have.a.property('studentcode');
        expect(res.body[0].grades[0]).to.have.property('coursecode');
        done();
      });
  });
});
