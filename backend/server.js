import express from "express";
import dotenv from "dotenv";
dotenv.config()
import morgan from "morgan";
import nocache from "nocache";
import cors from "cors"
const app = express();
import {connectDB} from "./server/connection/database.js"

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
};
app.use(cors(corsOptions));




app.get('/', (req, res) => {
    res.write("working");
    res.end(); 
});

app.use(nocache())
app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({extended : true}));
connectDB()



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
