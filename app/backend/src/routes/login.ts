import { Router } from 'express';
import loginController from '../controllers/login';

const routerLogin = Router();

routerLogin.post('/login', loginController.login);

export default routerLogin;
