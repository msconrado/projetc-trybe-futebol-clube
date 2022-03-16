import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import dockerUser from './mock/models/UsersMock';
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

  describe('O login', () => {
    it('é feito com sucesso', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        username: dockerUser[0].username,
        password: dockerUser[0].password,
      });

      expect(chaiHttpResponse).to.have.status(200);
    });

    it('da erro quando o email ou o password é invalido', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        username: dockerUser[1].username,
        password: dockerUser[1].password,
      });
      expect(chaiHttpResponse).to.be.eq(401);
    });
  });
});
