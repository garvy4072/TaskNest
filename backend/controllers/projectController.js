/** @format */

import Project from '../models/projectModel.js';

export const createProject = async (req, res) => {
	try {
		console.log(req.body);

		const { name, description } = req.body;

		if (!name)
			return res.status(400).json({ message: 'Project name required' });

		const project = await Project.create({
			name,
			description,
			owner: req.user._id,
			members: [req.user._id],
		});

		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getProjects = async (req, res) => {
	try {
		const projects = await Project.find({
			members: { $in: [req.user._id] },
		});

		res.json(projects);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteProject = async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);

		if (!project) return res.status(404).json({ message: 'Project not found' });

		if (project.owner.toString() !== req.user._id.toString())
			return res.status(403).json({ message: 'Not authorized' });

		await project.deleteOne();

		res.json({ message: 'Project deleted' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
