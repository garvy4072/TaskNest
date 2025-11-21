/** @format */

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
const app = express();
app.use(express.json());
app.use(clerkMiddleware());
app.use(cors());
app.get('/', (req, res) => {
	res.send('wordk');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('server work');
});
