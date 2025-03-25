import express from 'express';
import { getOtherUser, getProfile, login, logout, register } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/register', register)
router.post('/login', login)
router.post('/logout', isAuthenticated,logout);
router.get('/get-profile', isAuthenticated, getProfile)
router.get('/get-otheruser', isAuthenticated, getOtherUser)

export default router;