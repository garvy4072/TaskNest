/** @format */

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import Layout from '../components/Layout';

import {
	Box,
	Typography,
	Card,
	IconButton,
	Fab,
	Button,
	Drawer,
	TextField,
	Divider,
	Chip,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';

export default function Dashboard() {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const [projects, setProjects] = useState([]);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const [projectName, setProjectName] = useState('');
	const [description, setDescription] = useState('');

	const fetchProjects = async () => {
		try {
			const { data } = await API.get('/api/projects');
			setProjects(data);
		} catch (err) {
			console.log(err);
		}
	};

	const createProject = async () => {
		if (!projectName) return;

		try {
			await API.post('/api/projects', {
				name: projectName,
				description,
			});

			setProjectName('');
			setDescription('');
			setDrawerOpen(false);
			fetchProjects();
		} catch {
			alert('Failed to create project');
		}
	};

	const deleteProject = async (id) => {
		if (!confirm('Delete this project?')) return;
		try {
			await API.delete(`/api/projects/${id}`);
			fetchProjects();
		} catch {
			alert('Error deleting project');
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	if (!user) {
		return (
			<Layout>
				<Typography>Please login to continue.</Typography>
			</Layout>
		);
	}

	return (
		<Layout>
			<Box sx={{ maxWidth: '1200px', mx: 'auto', p: 2 }}>
				{/* --- HERO HEADER --- */}
				<Box sx={{ mb: 5 }}>
					<Typography
						variant='h4'
						fontWeight={600}>
						Hey {user.name} 👋
					</Typography>

					<Typography sx={{ opacity: 0.6, mt: 1 }}>
						Welcome back — your workspaces are ready.
					</Typography>
				</Box>

				{/* --- PROJECT GRID --- */}
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							sm: 'repeat(2, 1fr)',
							md: 'repeat(3, 1fr)',
						},
						gap: 3,
					}}>
					{projects.length === 0 && (
						<Card
							sx={{
								p: 4,
								textAlign: 'center',
								borderRadius: 3,
								border: '2px dashed #ccc',
							}}>
							<Typography variant='subtitle1'>
								No projects yet — create your first one.
							</Typography>
						</Card>
					)}

					{projects.map((p) => (
						<Card
							key={p._id}
							sx={{
								p: 3,
								borderRadius: 3,
								cursor: 'pointer',
								transition: '.2s',
								'&:hover': { transform: 'scale(1.02)', boxShadow: 5 },
							}}
							onClick={() => navigate(`/project/${p._id}`)}>
							<FolderIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />

							<Typography
								variant='h6'
								fontWeight={600}>
								{p.name}
							</Typography>

							<Typography sx={{ opacity: 0.7, mt: 0.5, minHeight: 30 }}>
								{p.description}
							</Typography>

							<Divider sx={{ my: 2 }} />

							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'>
								<Chip
									label='Project'
									size='small'
									sx={{ borderRadius: '6px', fontSize: '12px' }}
								/>

								<IconButton
									size='small'
									onClick={(e) => {
										e.stopPropagation();
										deleteProject(p._id);
									}}>
									<DeleteIcon fontSize='small' />
								</IconButton>
							</Box>
						</Card>
					))}
				</Box>

				{/* --- CREATE PROJECT BUTTON (FAB) --- */}
				<Fab
					variant='extended'
					color='primary'
					sx={{
						position: 'fixed',
						bottom: 30,
						right: 30,
						px: 3,
						borderRadius: 3,
					}}
					onClick={() => setDrawerOpen(true)}>
					<AddIcon sx={{ mr: 1 }} /> Create Project
				</Fab>

				{/* --- DRAWER FORM --- */}
				<Drawer
					anchor='right'
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
					sx={{ '& .MuiDrawer-paper': { width: 350, p: 3 } }}>
					<Typography
						variant='h6'
						fontWeight={600}
						sx={{ mb: 2 }}>
						New Project
					</Typography>

					<TextField
						label='Project Name'
						fullWidth
						sx={{ mb: 2 }}
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
					/>

					<TextField
						label='Description'
						fullWidth
						multiline
						rows={3}
						sx={{ mb: 3 }}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<Button
						variant='contained'
						fullWidth
						onClick={createProject}>
						Create
					</Button>
				</Drawer>
			</Box>
		</Layout>
	);
}
