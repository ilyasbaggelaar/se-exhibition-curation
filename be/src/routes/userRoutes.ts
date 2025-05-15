import { Router } from 'express';
import { getUserID, getUsers } from '../controllers/userController';
// const { getUsers } = require('../controllers/userController');


const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserID)

export default router;