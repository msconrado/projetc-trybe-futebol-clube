import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import loginController from '../controllers/login';

const router = Router();

router.get('/login/validate', loginController.user);
router.post('/login', loginValidation, loginController.login);

export default router;
