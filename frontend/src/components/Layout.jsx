/** @format */

import { Container, Box } from '@mui/material';

export default function Layout({ children }) {
	return (
		<Box
			component='main'
			role='main'
			sx={{
				minHeight: 'calc(100vh - 64px)',
				py: { xs: 3, md: 4 },
			}}>
			<Container maxWidth='lg'>{children}</Container>
		</Box>
	);
}
