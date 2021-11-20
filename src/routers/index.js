const { Router } = require("express");
const router = Router();
const passport = require("../auth/config");
const authRouter = require("../auth/router");
const crudRouter = require("./crud");

router.use("/auth", authRouter);
router.use("/", passport.authenticate("jwt", { session: false }), crudRouter);

module.exports = router;
