
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db');
db.connect();
const cors = require('cors');
const route=require('./routers')
// required('dotenv').config();
const app=express();
const port=process.env.PORT||5000;

app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.get("/",(req, res) => {
    res.send("Hello world");
})
route(app);
app.listen(port,()=>{console.log(`server run on http://localhost:${port}`)})