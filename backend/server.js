import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import nocache from "nocache";
import {connectDB} from "./server/connection/database.js"




dotenv.config()
connectDB()
const app = express();

app.get('/', (req, res) => {
    res.write("working");
    res.end(); 
});

app.use(nocache())
app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({extended : true}));




const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
