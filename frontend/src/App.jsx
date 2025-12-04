/** @format */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ProjectView from './pages/ProjectView';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path='/'
						element={<Landing />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/project/:id'
						element={
							<ProtectedRoute>
								<ProjectView />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/settings'
						element={
							<ProtectedRoute>
								<Settings />
							</ProtectedRoute>
						}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
