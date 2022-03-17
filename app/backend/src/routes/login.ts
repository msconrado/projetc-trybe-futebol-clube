import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import loginController from '../controllers/login';

const routerLogin = Router();

routerLogin.get('/login/validate', loginController.user);
routerLogin.post('/login', loginValidation, loginController.login);

export default routerLogin;
