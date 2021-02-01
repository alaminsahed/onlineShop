import express from 'express';
const router = express.Router()
import {authUser, getUserProfile,registerUser, updateUserProfile} from '../controllers/userController.js';
import {protect} from '../MiddleWare/authMiddleWare.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect,getUserProfile).put(protect, updateUserProfile)

export default router;
