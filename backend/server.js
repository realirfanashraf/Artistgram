import express from "express";
import dotenv from "dotenv";
dotenv.config()
import morgan from "morgan";
import nocache from "nocache";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
import { connectDB } from "./server/connection/database.js"
import userRoute from './server/router/userRoutes/authRoutes.js'
import adminRoute from './server/router/adminRoutes/authRoutes.js'
import uploadRoutes from './server/router/userRoutes/uploadRoutes.js'
import apiRoutes from './server/router/adminRoutes/apiRoutes.js'
import userApiRoute from './server/router/userRoutes/userApiRoute.js'

const corsOptions = {
    origin: 'http://localhost:5173',
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
app.use('/api',userApiRoute)
app.use('/upload', uploadRoutes)
app.use('/admin', adminRoute)
app.use('/admin/api', apiRoutes)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
