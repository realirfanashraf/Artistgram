import express from "express";
import dotenv from "dotenv";
dotenv.config()
import http from 'http';
import morgan from "morgan";
import nocache from "nocache";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./server/connection/database.js"
import userRoute from './server/router/userRoutes/authRoutes.js'
import adminRoute from './server/router/adminRoutes/authRoutes.js'
import uploadRoutes from './server/router/userRoutes/uploadRoutes.js'
import apiRoutes from './server/router/adminRoutes/apiRoutes.js'
import userApiRoute from './server/router/userRoutes/userApiRoute.js'
import actionRoute from './server/router/adminRoutes/actionRoute.js'
import initializeSocket from './socket.js';
import userActionRoute from './server/router/userRoutes/userActionRoutes.js'

const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser())
app.use(nocache())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB()

app.use('/', userRoute)
app.use('/api', userApiRoute)
app.use('/upload', uploadRoutes)
app.use('/action',userActionRoute)
app.use('/admin', adminRoute)
app.use('/admin/api', apiRoutes)
app.use('/admin/action/', actionRoute)

initializeSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
