import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.write("working");
    res.end(); 
});







const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
