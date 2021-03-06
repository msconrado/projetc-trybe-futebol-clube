import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import ClubModel from '../database/models/ClubsModel';
import MatchModel from '../database/models/MatchModel';
import User from '../database/models/UserModel';
import clubsMock from './mock/clubsMock';
import { user, admin } from './mock/usersMock';
import matchsMock, {
  inProgessFalse,
  postMatchs,
  scoreboardUpdate,
  TwoEqualTeams,
} from './mock/matchsMock';
import { Response } from 'superagent';
import { leaderboardMock } from './mock/leaderboardMock';
import { Matchs } from '../interfaces/matchsInterfaces';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas Login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves(user[0] as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  describe('POST /login', () => {
    it('é feito com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: user[0].email,
        password: 'secret_user',
      });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.token).to.have.key;
    });

    it("da a messagem de erro 'Incorrect email or password' quando o email ou o password é invalido", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: user[1].email,
        password: user[0].password,
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(
        'Incorrect email or password'
      );
    });

    it("da a messagem de erro 'Incorrect email or password' quando o email ou o password não esta cadastrado", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: user[0].password,
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(
        'Incorrect email or password'
      );
    });

    it("da a messagem de erro 'All fields must be fillederr' quando não passa o email", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        password: user[0].password,
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(
        'All fields must be filled'
      );
    });
  });

  describe('GET /login/validate', () => {
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

describe('Rotas Clubs', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(ClubModel, 'findAll').resolves(clubsMock as ClubModel[]);
  });

  after(() => {
    (ClubModel.findAll as sinon.SinonStub).restore();
  });

  describe('GET /clubs', () => {
    it('é retornado um array com todos os clubs', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.length(3);
    });
  });

  describe('GET /clubs/:id', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(ClubModel, 'findByPk').resolves(clubsMock[0] as ClubModel);
    });

    after(() => {
      (ClubModel.findByPk as sinon.SinonStub).restore();
    });

    it('é retornado um club existente', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/1');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.id).to.have.equal(1);
      expect(chaiHttpResponse.body.clubName).to.have.equal('Avaí/Kindermann');
    });
  });
});

describe('Rotas Matchs', () => {
  describe('GET /matchs', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchsMock as MatchModel[]);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });
    it('é retornado um array de todos os matchs', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.length(2);
      expect(chaiHttpResponse.body[0].id).to.be.equal(1);
    });
  });

  describe('GET /matchs?inProgress=true', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(MatchModel, 'findAll')
        .resolves([matchsMock[0]] as MatchModel[]);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('é retornado uma partida em andamento', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs?inProgress=true');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.length(1);
      expect(chaiHttpResponse.body[0].inProgress).to.have.equal(1);
    });
  });

  describe('GET /matchs?inProgress=false', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(MatchModel, 'findAll')
        .resolves([matchsMock[1]] as MatchModel[]);
    });

    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('é retornado uma partida em andamento', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs?inProgress=false');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.length(1);
      expect(chaiHttpResponse.body[0].inProgress).to.have.equal(0);
    });
  });

  describe('POST /matchs', () => {
    let chaiHttpResponse: Response;
    let tokenHttpResponse: Response;

    before(async () => {
      sinon.stub(MatchModel, 'create').resolves(matchsMock[0] as MatchModel);
    });

    after(() => {
      (MatchModel.create as sinon.SinonStub).restore();
    });

    it('é retornado os dados da partida que foi adicionada', async () => {
      tokenHttpResponse = await chai.request(app).post('/login').send({
        email: admin.email,
        password: 'secret_admin',
      });

      const { token } = tokenHttpResponse.body;

      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(postMatchs)
        .set({ Authorization: token });

      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body.id).to.have.equal(1);
      expect(chaiHttpResponse.body.homeTeam).to.have.equal(1);
      expect(chaiHttpResponse.body.awayTeam).to.have.equal(3);
      expect(chaiHttpResponse.body.inProgress).to.have.equal(1);
    });

    it("é retornado a messagem de erro 'Token invalido!!'", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(postMatchs);

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Token invalido!!');
    });

    it("é retornado a messagem de erro 'It is not possible to create a match with two equal teams' se estiver criando uma partida com 2 times iguais", async () => {
      tokenHttpResponse = await chai.request(app).post('/login').send({
        email: admin.email,
        password: 'secret_admin',
      });

      const { token } = tokenHttpResponse.body;

      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(TwoEqualTeams)
        .set({ Authorization: token });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(
        'It is not possible to create a match with two equal teams'
      );
    });

    it("é retornado a messagem de erro 'There is no team with such id!' se estiver criando uma partida com o inProgress 'false'", async () => {
      tokenHttpResponse = await chai.request(app).post('/login').send({
        email: admin.email,
        password: 'secret_admin',
      });

      const { token } = tokenHttpResponse.body;

      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(inProgessFalse)
        .set({ Authorization: token });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(
        'There is no team with such id!'
      );
    });

    it("é retornado a messagem 'Match finished!!' quando finaliza uma partida", async () => {
      chaiHttpResponse = await chai.request(app).patch('/matchs/1/finish');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.message).to.be.equal('Match finished!!');
    });
  });

  describe('PATCH /matchs/:id/finish', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(MatchModel, 'update');
    });

    after(() => {
      (MatchModel.update as sinon.SinonStub).restore();
    });
    it("é retornado a messagem 'Match finished!!' quando finaliza uma partida", async () => {
      chaiHttpResponse = await chai.request(app).patch('/matchs/1/finish');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.message).to.be.equal('Match finished!!');
    });
  });

  describe('PATCH /matchs/:id', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(MatchModel, 'update');
    });

    after(() => {
      (MatchModel.update as sinon.SinonStub).restore();
    });
    it("é retornado a messagem 'Match finished!!' quando finaliza uma partida", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matchs/1')
        .send(scoreboardUpdate);

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.scoreboard).to.have.key;
      expect(chaiHttpResponse.body.scoreboard.idMatch).to.be.equal(1);
      expect(chaiHttpResponse.body.scoreboard.homeTeam).to.be.equal(
        scoreboardUpdate.homeTeamGoals
      );
      expect(chaiHttpResponse.body.scoreboard.awayTeam).to.be.equal(
        scoreboardUpdate.awayTeamGoals
      );
    });
  });
});

describe('Rotas Leaderboard', () => {
  describe('GET /leaderboard', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(ClubModel, 'findAll').resolves(clubsMock as ClubModel[]);
      sinon.stub(MatchModel, 'findAll').resolves(leaderboardMock as Matchs[]);
    });

    after(() => {
      (ClubModel.findAll as sinon.SinonStub).restore();
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('é retornado a tabela de classificação geral', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0].name).to.be.equal('Avaí/Kindermann');
      expect(chaiHttpResponse.body[0].totalPoints).to.be.equal(7);
      expect(chaiHttpResponse.body[1].name).to.be.equal('Bahia');
    });
  });

  describe('GET /leaderboard/home', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(ClubModel, 'findAll').resolves(clubsMock as ClubModel[]);
      sinon.stub(MatchModel, 'findAll').resolves(leaderboardMock as Matchs[]);
    });

    after(() => {
      (ClubModel.findAll as sinon.SinonStub).restore();
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('é retornado a tabela de classificação jogos em casa', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0].name).to.be.equal('Bahia');
      expect(chaiHttpResponse.body[0].totalPoints).to.be.equal(4);
      expect(chaiHttpResponse.body[1].name).to.be.equal('Avaí/Kindermann');
    });
  });

  describe('GET /leaderboard/away', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(ClubModel, 'findAll').resolves(clubsMock as ClubModel[]);
      sinon.stub(MatchModel, 'findAll').resolves(leaderboardMock as Matchs[]);
    });

    after(() => {
      (ClubModel.findAll as sinon.SinonStub).restore();
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('é retornado a tabela de classificação jogos fora de casa', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0].name).to.be.equal('Avaí/Kindermann');
      expect(chaiHttpResponse.body[0].totalPoints).to.be.equal(4);
      expect(chaiHttpResponse.body[1].name).to.be.equal('Bahia');
    });
  });
});
