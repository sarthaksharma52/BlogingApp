const { Router } = require("express");
const User = require("../models/user");

const router = Router();

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

router.post("/signup", async (req, res, next) => {
    const { fullName, email, password } = req.body;
    try {
        await User.create({
            fullName,
            email,
            password,
        });
        return res.redirect("/home");
    } catch (error) {
        next(error);
    }
});

router.get("/logout", (req, res, next) => {
    res.clearCookie("token").redirect("/home");
});

module.exports = router;
