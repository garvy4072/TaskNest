/** @format */

import express from 'express';
import { protect } from './../Middleware/authMiddleware.js';
import {
	createTask,
	getTasks,
	updateStatus,
	deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/:projectId', protect, getTasks);
router.put('/:id/status', protect, updateStatus);
router.delete('/:id', protect, deleteTask);

export default router;
