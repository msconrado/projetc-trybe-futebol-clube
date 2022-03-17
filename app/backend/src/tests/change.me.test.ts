import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import usersMock from './mock/usersMock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  describe('Login', () => {
    //   it('é feito com sucesso', async () => {
    //     chaiHttpResponse = await chai.request(app)
    //     .post('/login')
    //     .send({
    //       email: usersMock[0].email,
    //       password: usersMock[0].password,
    //     });
    //     // console.log(chaiHttpResponse);

    //     expect(chaiHttpResponse).to.have.status(200);
    //   });

    it("da a messagem de erro 'Incorrect email or password' quando o email ou o password é invalido", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'email@email.com',
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
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  describe('Clubs', () => {
    //   it('', async () => {
    //     chaiHttpResponse = await chai.request(app)
    //     .post('/clubs');

    //     expect(chaiHttpResponse).to.have.status(200);
    //   });

          it('', async () => {
        chaiHttpResponse = await chai.request(app)
        .get('/clubs/1')

        // console.log(chaiHttpResponse);
        expect(chaiHttpResponse).to.have.status(200);
      });
  });
});
