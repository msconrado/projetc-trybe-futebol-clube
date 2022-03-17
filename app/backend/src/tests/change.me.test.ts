import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import ClubModel from '../database/models/ClubsModel';
import usersMock from './mock/usersMock';
import clubsMock from './mock/clubsMock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves(usersMock[0] as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  describe('Login', () => {
    it('é feito com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: usersMock[0].email,
        password: 'secret_user',
      });

      console.log(chaiHttpResponse.body.token);
      
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.token).to.have.key;
    });

    it("da a messagem de erro 'Incorrect email or password' quando o email ou o password é invalido", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: usersMock[1].password,
        password: usersMock[0].password,
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(
        'Incorrect email or password'
      );
    });
    it("da a messagem de erro 'All fields must be fillederr' quando não passa o email", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        password: usersMock[0].password,
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(
        'All fields must be filled'
      );
    });

    it("da a messagem de erro 'Token invalid' quando não passa o password", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .send({ authorization: 123456789 });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Token invalid');
    });
  });
});

describe('Rota /clubs', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(ClubModel, 'findAll').resolves(clubsMock as ClubModel[]);
  });

  after(() => {
    (ClubModel.findAll as sinon.SinonStub).restore();
  });

  describe('Clubs', () => {
    it('é retornado um array com todos os clubs', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.length(3);
    });
  });
});

describe('Rota /clubs/:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(ClubModel, 'findByPk').resolves(clubsMock[0] as ClubModel);
  });

  after(() => {
    (ClubModel.findByPk as sinon.SinonStub).restore();
  });

  describe('Club', () => {
    it('é retornado um club existente', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/1');

      expect(chaiHttpResponse).to.have.status(200);
    });
  });
});