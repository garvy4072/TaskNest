/** @format */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#2E7D32',
		},
		background: {
			default: '#F3F4F6',
			paper: '#FFFFFF',
		},
		text: {
			primary: '#111827',
			secondary: '#6B7280',
		},
	},
	typography: {
		fontFamily:
			"'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
		h4: { fontWeight: 600, letterSpacing: '-0.02em' },
		h6: { fontWeight: 600 },
		body1: { fontSize: '0.95rem' },
		body2: { fontSize: '0.85rem' },
		button: {
			textTransform: 'none',
			fontWeight: 600,
		},
	},
	shape: {
		borderRadius: 10,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 999,
					paddingInline: 18,
					paddingBlock: 9,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow: '0 10px 25px rgba(15,23,42,0.08)',
				},
			},
		},
	},
});

export default theme;
