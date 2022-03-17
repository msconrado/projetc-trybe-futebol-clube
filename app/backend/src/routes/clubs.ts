import { Router } from 'express';
import clubsController from '../controllers/clubs';

const router = Router();

router.get('/', clubsController.getAll);

export default router;
