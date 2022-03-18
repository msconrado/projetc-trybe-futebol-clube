import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard';

const router = Router();

router.get('/home', LeaderboardController.getAll);

export default router;
