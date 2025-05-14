import { Router } from 'express';
const { getUsers } = require('../controllers/userController');


const router = Router();

router.get('/', getUsers);

export default router;