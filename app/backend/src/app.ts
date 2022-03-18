import * as express from 'express';
import * as cors from 'cors';
import errorMiddleware from './middlewares/middlewareError';
import routerClubs from './routes/clubs';
import routerLeaderboard from './routes/leaderboard';
import routerLogin from './routes/login';
import routerMathcs from './routes/matchs';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    this.rotas();
    // ...
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    // ...
  }

  private rotas(): void {
    this.app.use('/login', routerLogin);
    this.app.use('/clubs', routerClubs);
    this.app.use('/matchs', routerMathcs);
    this.app.use('/leaderboard', routerLeaderboard);

    this.app.use(errorMiddleware);
  }
  // ...

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
