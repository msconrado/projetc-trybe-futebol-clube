import { Router } from 'express';
import leaderboardController from '../controllers/leaderboard';

const router = Router();

router.get('/', leaderboardController.getAll);
router.get('/home', leaderboardController.getAllHome);
router.get('/away', leaderboardController.getAllAway);

export default router;
