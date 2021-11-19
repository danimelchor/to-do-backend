const { Router } = require("express");
const passport = require("passport");
const router = Router();
const authRouter = require("./auth");
const crudRouter = require("./crud");

router.use("/auth", authRouter);
router.use("/", passport.authenticate("jwt", { session: false }), crudRouter);

module.exports = router;
