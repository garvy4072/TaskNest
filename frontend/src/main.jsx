/** @format */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';

import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store.js';
const PUBLISHABLEKEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLEKEY) {
	throw new Error('missing PUBLISHKEY');
}
createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<ClerkProvider publishableKey={PUBLISHABLEKEY}>
				<App />
			</ClerkProvider>
		</Provider>
	</BrowserRouter>
);
