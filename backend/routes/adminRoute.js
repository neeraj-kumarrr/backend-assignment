import express from 'express';
import { protect, authorize} from '../middlewares/auth.js';
import { createUser, getAllUsers, assignRole, createAdmin } from '../controllers/adminController.js'

const router = express.Router();

// Create user (admin only)
router.post('/create-admin' , createAdmin)

router.post('/create-user', protect, authorize(['admin']), createUser);

// Get all users (admin only)
router.get('/users', protect, authorize(['admin']), getAllUsers);

// Assign role (admin only)
router.put('/assign-role', protect , authorize(['admin']), assignRole);

export default router;
