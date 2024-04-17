import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import morgan from 'morgan';
import nocache from 'nocache';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { connectDB } from './server/connection/database.js';
import userRoute from './server/router/userRoutes/authRoutes.js';
import adminRoute from './server/router/adminRoutes/authRoutes.js';
import uploadRoutes from './server/router/userRoutes/uploadRoutes.js';
import apiRoutes from './server/router/adminRoutes/apiRoutes.js';
import userApiRoute from './server/router/userRoutes/userApiRoute.js';
import actionRoute from './server/router/adminRoutes/actionRoute.js';
import initializeSocket from './socket.js';
import userActionRoute from './server/router/userRoutes/userActionRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: 'https://artistgram.online',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.static(path.join(__dirname, '../frontend', 'dist')));
app.use(cookieParser());
app.use(nocache());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
connectDB();
app.use('/', userRoute);
app.use('/api', userApiRoute);
app.use('/upload', uploadRoutes);
app.use('/action', userActionRoute);
app.use('/admin', adminRoute);
app.use('/admin/api', apiRoutes);
app.use('/admin/action/', actionRoute);

// Socket initialization
initializeSocket(server);

// Wildcard route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});

// Server startup
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
