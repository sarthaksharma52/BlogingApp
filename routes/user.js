const { Router } = require("express");
const User = require("../models/user");
const multer = require('multer');
const path = require('path');

const router = Router();

const storagefile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/images`));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storagefile });

router.get("/signup", (req, res, next) => {
    res.render("signup");
});

router.get("/signin", (req, res, next) => {
    res.render("signin");
});

router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/home");
    } catch (error) {
        return res.render("signin", {
            error: "incorrect email and password",
        });
    }
});

router.post("/signup", upload.single('ProfileImage'), async (req, res, next) => {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    const { fullName, email, password } = req.body;
    try {
        await User.create({
            fullName,
            email,
            password,
            profileImageURL: `/images/${req.file.filename}`,
        });
        // console.log(profileImageURL);
        return res.redirect("/home");
    } catch (error) {
        next(error);
    }
});

router.get("/logout", (req, res, next) => {
    res.clearCookie("token").redirect("/home");
});

module.exports = router;
