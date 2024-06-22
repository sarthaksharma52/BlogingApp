const { Router } = require("express");
const multer = require('multer');
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

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

router.get("/:id", async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy");
        const comments = await Comment.find({blogId: req.params.id }).populate("createdBy");
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        // console.log("comments",comments);

        return res.render("blog", {
            user: req.user,
            blog,
            comments,
        });
    } catch (err) {
        next(err);
    }
});

router.post("/home1", upload.single('CoverImage'), async (req, res, next) => {
    const { body, title } = req.body;
    try {
        const blog = await Blog.create({
            body,
            title,
            createdBy: req.user._id,  // Ensure this line is correct
            CoverImageUrl: `/uploads/${req.file.filename}`,
        });
        res.redirect(`/blog/${blog._id}`);
    } catch (err) {
        next(err);
    }
});

router.post("/comment/:blogId", async (req, res, next) => {
    try {
        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,  // Changed from req.body.blogId
            createdBy: req.user._id,
        });
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (err) {
        next(err);
    }
});



module.exports = router;
