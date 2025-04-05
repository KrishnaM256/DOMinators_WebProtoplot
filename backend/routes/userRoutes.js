import express from 'express'
const router = express.Router()
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUserById,
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
} from '../controllers/userController.js'
import { authenticate, authorized } from '../middlewares/authMiddleware.js'
import { upload } from '../utils/multer.js'

router
  .route('/profile')
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile)

router.post(
  '/register',
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  createUser
)

router.route('/auth').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/users-list').get(authenticate, authorized, getAllUsers)

router
  .route('/:id')
  .delete(authenticate, authorized, deleteUser)
  .get(authenticate, authorized, getUserById)
  .post(authenticate, authorized, updateUserById)

export default router
