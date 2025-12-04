/** @format */

import { Box, Typography, Card, TextField, Switch, FormControlLabel } from '@mui/material';
import Layout from '../components/Layout';

export default function Settings() {
	return (
		<Layout>
			<Box sx={{ px: { xs: 1, md: 3 } }}>
				<Typography
					variant='h4'
					sx={{ mb: 1 }}>
					Settings
				</Typography>
				<Typography
					variant='body2'
					sx={{ mb: 3, color: 'text.secondary' }}>
					Configure TaskNest for your workspace. This is a UI-only MVP screen for now.
				</Typography>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
						gap: 2,
					}}>
					<Card sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
						<Typography variant='subtitle1'>Workspace</Typography>
						<TextField
							label='Workspace name'
							size='small'
							placeholder='TaskNest'
						/>
						<TextField
							label='Default project prefix'
							size='small'
							placeholder='TN'
						/>
					</Card>

					<Card sx={{ p: 2.5 }}>
						<Typography variant='subtitle1'>Notifications</Typography>
						<FormControlLabel
							control={<Switch defaultChecked />}
							label='Email me when tasks move to Done'
						/>
						<FormControlLabel
							control={<Switch />}
							label='Send daily summary'
						/>
					</Card>
				</Box>
			</Box>
		</Layout>
	);
}


