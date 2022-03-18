import { Router } from 'express';
import {
  matchsTokenValidation,
  matchsClubsValidation,
} from '../middlewares/matchsValidation';

import matchsController from '../controllers/matchs';

const router = Router();

router.get('/', matchsController.getAll);
router.post(
  '/',
  matchsTokenValidation,
  matchsClubsValidation,
  matchsController.notClubs,
  matchsController.create,
);
router.patch('/:id', matchsController.updateGoals);
router.patch('/:id/finish', matchsController.updateInProgress);

export default router;
