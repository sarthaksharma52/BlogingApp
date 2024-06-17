const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const userRoute = require("./routes/user");
const { connect } = require('http2');

const app = express();
const port = 8000;

//midlewares

app.use(express.urlencoded({extended:false}));


mongoose.connect('mongodb://127.0.0.1:27017/blogify')
.then((e)=>{ console.log("mongodb connected")})
.catch()

app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"));


app.get("/",(req,res)=>{
    res.render("home");
});

app.use('/user', userRoute);

app.listen(port,(req,res)=>{
    console.log(`app is listen at port:${port}`);
});
