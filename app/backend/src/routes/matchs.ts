import { Router } from 'express';
import matchsController from '../controllers/matchs';

const router = Router();

router.get('/', matchsController.getAll);
router.post('/', matchsController.create);

export default router;
