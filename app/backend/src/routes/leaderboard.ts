import { Router } from 'express';
import LeaderboardController from '../controllers/login';

const router = Router();

router.get('/home', LeaderboardController.getAll);

export default router;
