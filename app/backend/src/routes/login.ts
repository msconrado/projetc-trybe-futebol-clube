import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import loginController from '../controllers/login';

const router = Router();

router.get('/validate', loginController.user);
router.post('/', loginValidation, loginController.login);

export default router;
