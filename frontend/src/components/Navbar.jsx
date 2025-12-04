/** @format */

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<AppBar
			position='static'
			color='default'
			elevation={0}
			sx={{
				borderBottom: '1px solid rgba(0,0,0,0.06)',
				bgcolor: 'background.paper',
				mb: 2,
			}}>
			<Toolbar
				component='nav'
				aria-label='Primary navigation'
				sx={{ gap: 2 }}>
				<Box
					onClick={() => navigate('/')}
					sx={{ cursor: 'pointer' }}>
					<Typography
						variant='h6'
						sx={{ fontWeight: 600 }}>
						TaskNest
					</Typography>
					<Typography
						variant='body2'
						sx={{ color: 'text.secondary', fontSize: 12 }}>
						Projects & tasks
					</Typography>
				</Box>

				<Box sx={{ flexGrow: 1 }} />

				{!user && (
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button
							component={NavLink}
							to='/login'
							variant='text'
							sx={({ isActive }) => ({
								color: isActive ? 'primary.main' : 'text.primary',
							})}>
							Login
						</Button>
						<Button
							component={NavLink}
							to='/register'
							variant='contained'>
							Sign up
						</Button>
					</Box>
				)}

				{user && (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Typography
							variant='body2'
							sx={{ color: 'text.secondary' }}>
							Signed in as <strong>{user.name}</strong>
						</Typography>
						<Button
							variant='outlined'
							onClick={logout}>
							Logout
						</Button>
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
}
