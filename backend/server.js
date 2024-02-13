import express from "express";
import dotenv from "dotenv";
dotenv.config()
import morgan from "morgan";
import nocache from "nocache";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
import {connectDB} from "./server/connection/database.js"
import userRoute from './server/router/userRoutes/authRoutes.js'

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
app.use(express.urlencoded({extended : true}));
connectDB()

app.use('/', userRoute)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
