/** @format */

import { useState, useContext } from 'react';
import { TextField, Button, Card, Typography, Box } from '@mui/material';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
	const { user, login } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setSubmitting(true);
		try {
			const { data } = await API.post('/api/user/login', { email, password });
			login(data);
			const redirectTo = location.state?.from || '/dashboard';
			navigate(redirectTo, { replace: true });
		} catch (err) {
			setError(
				err.response?.data?.message || 'Login failed. Please try again.'
			);
		} finally {
			setSubmitting(false);
		}
	};

	const disabled = !email || !password || submitting;

	if (user) {
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);
	}

	return (
		<Box
			component='section'
			aria-labelledby='login-title'
			sx={{ display: 'flex', justifyContent: 'center', mt: 6, px: 2 }}>
			<Card
				component='form'
				onSubmit={handleSubmit}
				sx={{ width: '100%', maxWidth: 420, p: 3 }}>
				<Typography
					id='login-title'
					variant='h5'
					sx={{ mb: 1 }}>
					Login
				</Typography>
				<Typography
					variant='body2'
					sx={{ mb: 2, color: 'text.secondary' }}>
					Sign in to access your projects and task boards.
				</Typography>
				<TextField
					label='Email'
					fullWidth
					margin='normal'
					type='email'
					autoComplete='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<TextField
					label='Password'
					fullWidth
					margin='normal'
					type='password'
					autoComplete='current-password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{error && (
					<Typography
						variant='body2'
						sx={{ mt: 1, color: 'error.main' }}>
						{error}
					</Typography>
				)}
				<Button
					fullWidth
					variant='contained'
					type='submit'
					sx={{ mt: 2 }}
					disabled={disabled}>
					{submitting ? 'Signing in…' : 'Login'}
				</Button>
				<Typography
					variant='body2'
					sx={{ mt: 2 }}>
					New here? <Link to='/register'>Create an account</Link>.
				</Typography>
			</Card>
		</Box>
	);
}
