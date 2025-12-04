/** @format */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import {
	Box,
	Typography,
	Breadcrumbs,
	Link,
	Button,
	Drawer,
	TextField,
	MenuItem,
	IconButton,
	Card,
	Chip,
	Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Layout from '../components/Layout';

export default function ProjectView() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [tasks, setTasks] = useState([]);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('medium');

	const fetchTasks = async () => {
		try {
			const { data } = await API.get(`/api/tasks/${id}`);
			setTasks(data);
		} catch (err) {
			console.log(err);
		}
	};

	const createTask = async () => {
		if (!title) return;
		try {
			await API.post(`/api/tasks`, {
				title,
				description,
				priority,
				project: id,
			});
			setTitle('');
			setDescription('');
			fetchTasks();
			setDrawerOpen(false);
		} catch {
			alert('Failed to create task');
		}
	};

	const updateStatus = async (taskId, status) => {
		try {
			await API.put(`/api/tasks/${taskId}/status`, { status });
			fetchTasks();
		} catch {
			alert('Failed to update task');
		}
	};

	const deleteTask = async (taskId) => {
		if (!confirm('Delete this task?')) return;
		try {
			await API.delete(`/api/tasks/${taskId}`);
			fetchTasks();
		} catch {
			alert('Error deleting task');
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const columns = [
		{ key: 'todo', title: 'To Do' },
		{ key: 'in-progress', title: 'In Progress' },
		{ key: 'done', title: 'Done' },
	];

	const priorityColor = {
		high: 'error',
		medium: 'warning',
		low: 'success',
	};

	return (
		<Layout>
			<Box sx={{ maxWidth: '1200px', margin: 'auto', p: 2 }}>
				<Breadcrumbs sx={{ mb: 1 }}>
					<Link
						sx={{ cursor: 'pointer' }}
						onClick={() => navigate('/dashboard')}>
						Dashboard
					</Link>
					<Typography color='text.primary'>Project</Typography>
				</Breadcrumbs>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 2,
					}}>
					<Typography
						variant='h4'
						fontWeight={600}>
						Tasks
					</Typography>

					<Button
						startIcon={<AddIcon />}
						variant='contained'
						onClick={() => setDrawerOpen(true)}>
						Add Task
					</Button>
				</Box>

				<Divider sx={{ mb: 3 }} />

				{/* ----- Task Columns -------- */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						gap: 3,
					}}>
					{columns.map((col) => (
						<Box
							key={col.key}
							sx={{ flex: 1 }}>
							<Typography
								variant='h6'
								sx={{ mb: 2, fontWeight: 600 }}>
								{col.title}
							</Typography>

							{tasks.filter((t) => t.status === col.key).length === 0 && (
								<Typography sx={{ opacity: 0.6, fontStyle: 'italic' }}>
									No tasks yet.
								</Typography>
							)}

							{tasks
								.filter((t) => t.status === col.key)
								.map((t) => (
									<Card
										key={t._id}
										sx={{
											p: 2,
											mb: 2,
											borderLeft: `5px solid`,
											borderColor: priorityColor[t.priority] || 'primary.main',
										}}>
										<Box
											bgcolor={priorityColor[t.priority]}
											display='flex'
											justifyContent='space-between'
											alignItems='center'>
											<Typography fontWeight={600}>{t.title}</Typography>
											{col.key === 'todo' && (
												<IconButton
													size='small'
													onClick={() => deleteTask(t._id)}>
													<DeleteIcon fontSize='small' />
												</IconButton>
											)}
										</Box>

										<Typography sx={{ opacity: 0.8, mb: 1 }}>
											{t.description}
										</Typography>

										<Chip
											label={t.priority}
											color={priorityColor[t.priority]}
											size='small'
											sx={{ mb: 1 }}
										/>

										{col.key !== 'done' && (
											<Button
												endIcon={<ArrowForwardIosIcon />}
												size='small'
												onClick={() =>
													updateStatus(
														t._id,
														col.key === 'todo' ? 'in-progress' : 'done'
													)
												}>
												Move
											</Button>
										)}
									</Card>
								))}
						</Box>
					))}
				</Box>

				<Drawer
					anchor='right'
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
					sx={{ '& .MuiDrawer-paper': { width: 350, p: 3 } }}>
					<Typography
						variant='h6'
						fontWeight={600}
						sx={{ mb: 2 }}>
						New Task
					</Typography>

					<TextField
						label='Title'
						fullWidth
						sx={{ mb: 2 }}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<TextField
						label='Description'
						fullWidth
						multiline
						rows={3}
						sx={{ mb: 2 }}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<TextField
						label='Priority'
						fullWidth
						select
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
						sx={{ mb: 3 }}>
						<MenuItem value='low'>Low</MenuItem>
						<MenuItem value='medium'>Medium</MenuItem>
						<MenuItem value='high'>High</MenuItem>
					</TextField>

					<Button
						variant='contained'
						fullWidth
						onClick={createTask}>
						Create Task
					</Button>
				</Drawer>
			</Box>
		</Layout>
	);
}
