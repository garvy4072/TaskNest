/** @format */

import Task from './../models/taskModel.js';

export const createTask = async (req, res) => {
	try {
		const { title, description, project, priority, assignedTo } = req.body;

		if (!title || !project) {
			return res
				.status(400)
				.json({ message: 'Title and Project are required' });
		}

		const task = await Task.create({
			title,
			description,
			project,
			priority,
			assignedTo,
			createdBy: req.user._id,
		});

		res.status(201).json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ project: req.params.projectId })
			.populate('assignedTo', 'name email')
			.populate('createdBy', 'name email');

		res.json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateStatus = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) return res.status(404).json({ message: 'Task not found' });

		task.status = req.body.status;
		await task.save();

		res.json(task);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) return res.status(404).json({ message: 'Task not found' });

		await task.deleteOne();

		res.json({ message: 'Task deleted' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
