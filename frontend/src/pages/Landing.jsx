/** @format */

import {
	Box,
	Button,
	Typography,
	Card,
	Grid,
	Stack,
	Divider,
} from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';

export default function Landing() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const primaryCta = () => navigate(user ? '/dashboard' : '/register');
	const secondaryCta = () => navigate(user ? '/dashboard' : '/login');

	return (
		<Box
			sx={{
				minHeight: 'calc(100vh - 64px)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				px: 3,
				py: { xs: 5, md: 10 },
				background:
					'radial-gradient(circle at top, rgba(46,125,50,0.08) 0%, rgba(255,255,255,1) 60%)',
			}}>
			<Box sx={{ maxWidth: '1100px', width: '100%' }}>
				<Grid
					container
					spacing={6}
					alignItems='center'>
					{/* LEFT SECTION */}
					<Grid
						item
						xs={12}
						md={6}>
						<Typography
							variant='overline'
							sx={{
								color: 'primary.main',
								fontWeight: 600,
								letterSpacing: '0.15em',
							}}>
							TASKNEST
						</Typography>

						<Typography
							variant='h3'
							sx={{
								mt: 1,
								mb: 2,
								fontWeight: 700,
								lineHeight: 1.2,
								background: 'linear-gradient(90deg, #2E7D32, #4CAF50)',
								WebkitBackgroundClip: 'text',
								color: 'transparent',
							}}>
							Organize work. Track progress. Stay focused.
						</Typography>

						<Typography
							variant='body1'
							sx={{ color: 'text.secondary', mb: 4 }}>
							A clean, distraction-free task and project manager built for small
							teams and solo founders. No complexity — just work, progress, and
							outcome.
						</Typography>

						<Stack
							spacing={2}
							direction={{ xs: 'column', sm: 'row' }}>
							<Button
								variant='contained'
								size='large'
								onClick={primaryCta}>
								{user ? 'Go to Dashboard' : 'Get Started Free'}
							</Button>

							<Button
								variant='outlined'
								size='large'
								onClick={secondaryCta}>
								{user ? 'View Workspaces' : 'Sign In'}
							</Button>
						</Stack>

						<Typography sx={{ color: 'text.secondary', mt: 2 }}>
							No credits. No setup. Just workflow.
						</Typography>
					</Grid>

					{/* RIGHT SECTION */}

					<Grid
						item
						xs={12}
						md={6}>
						<Card
							sx={{
								p: 3,
								borderRadius: 4,
								boxShadow: 3,
								backdropFilter: 'blur(6px)',
							}}>
							<Typography
								variant='subtitle1'
								fontWeight={600}
								sx={{ mb: 2 }}>
								What’s inside
							</Typography>

							<Divider sx={{ mb: 2 }} />

							<Stack spacing={2}>
								{[
									'Secure authentication & protected routes',
									'Manage unlimited projects easily',
									'Kanban task board with priorities',
									'Clean minimal UI with a professional feel',
								].map((item) => (
									<Stack
										key={item}
										direction='row'
										spacing={1.5}
										alignItems='center'>
										<CheckIcon sx={{ color: 'primary.main' }} />
										<Typography variant='body2'>{item}</Typography>
									</Stack>
								))}
							</Stack>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
