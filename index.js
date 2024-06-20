const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Import the Blog model
const Blog = require('./models/blog');

// Import routes
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

// Import middlewares
const { CheckForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const port = 8000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(CheckForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/blogify')
    .then(() => { console.log("mongodb connected"); })
    .catch((err) => { console.error("mongodb connection error:", err); });

// View engine setup
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

// Routes
app.get("/home", async (req, res, next) => {
    try {
        const allBlogs = await Blog.find({});
        res.render("home", {
            user: req.user,
            blogs: allBlogs,
        });
    } catch (err) {
        next(err);
    }
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`app is listening at port: ${port}`);
});
