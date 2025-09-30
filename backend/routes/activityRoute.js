import express from 'express';
import { protect, authorize } from '../middlewares/auth.js';
import { logButtonClick, getActivityLogs , deleteLog , updateLog } from '../controllers/activityController.js';

const router = express.Router();

// Log button click (all authenticated users)
router.post('/log-click', protect, logButtonClick);

// Get activity logs (admin and manager only)
router.get('/logs', protect, authorize(['admin', 'manager']), getActivityLogs);

router.put('/update/:id' , protect , authorize(['admin']) , updateLog )

router.delete('/delete/:id' , protect ,authorize(['admin']) , deleteLog)

export default router;
