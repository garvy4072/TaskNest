/** @format */

import { useState } from 'react';
import { TextField, Button, Card, Typography } from '@mui/material';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const [password, setPassword] = useState('');

	const handleSubmit = async () => {
		try {
			await API.post('/api/user/register', { name, email, password });
			alert('Registered successfully. Now login.');
			setTimeout(() => {
				navigate('/login');
			}, 500);
		} catch (error) {
			alert(error.response?.data?.message || 'Registration failed');
		}
	};

	return (
		<Card sx={{ width: 400, margin: '100px auto', padding: 3 }}>
			<Typography
				variant='h5'
				sx={{ mb: 2 }}>
				Register
			</Typography>
			<TextField
				label='Name'
				fullWidth
				margin='normal'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<TextField
				label='Email'
				fullWidth
				margin='normal'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				label='Password'
				fullWidth
				margin='normal'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button
				fullWidth
				variant='contained'
				sx={{ mt: 2 }}
				onClick={handleSubmit}>
				Register
			</Button>
		</Card>
	);
}
