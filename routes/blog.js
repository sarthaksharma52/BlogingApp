const { Router } = require("express");
const multer = require('multer');
const path = require("path");
const Blog = require("../models/blog");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

router.get("/addNew", (req, res, next) => {
    res.render("addBlog", {
        user: res.user,
    });
});

router.post("/home1", upload.single('CoverImage'), async (req, res, next) => {
    const { body, title } = req.body;
    try {
        const blog = await Blog.create({
            body,
            title,
            createdBy: req.user._id,
            CoverImageUrl: `/uploads/${req.file.filename}`,
        });
        res.redirect(`/blog/${blog._id}`);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
