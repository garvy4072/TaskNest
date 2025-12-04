/** @format */

import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<Layout>
			<Box
				sx={{
					textAlign: 'center',
					py: 8,
				}}>
				<Typography variant='h4'>Page not found</Typography>
				<Typography
					variant='body2'
					sx={{ color: 'text.secondary', mt: 1 }}>
					The page you’re looking for doesn’t exist.
				</Typography>
				<Button
					sx={{ mt: 3 }}
					variant='contained'
					onClick={() => navigate('/')}>
					Back to dashboard
				</Button>
			</Box>
		</Layout>
	);
}


