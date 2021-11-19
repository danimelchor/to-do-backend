const { Router } = require("express");
const passport = require("passport");
const router = Router();
const authRouter = require("./auth");
const crudRouter = require("./crud");

router.use(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  authRouter
);
router.use("/", crudRouter);

module.exports = router;
