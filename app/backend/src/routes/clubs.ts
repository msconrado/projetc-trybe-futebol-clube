import { Router } from 'express';
import clubsController from '../controllers/clubs';

const router = Router();

router.get('/clubs', clubsController.getAll);

export default router;
