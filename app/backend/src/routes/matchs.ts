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

export default router;
