const { Router } = require("express");
const router = Router();
const passport = require("../auth/config");
const authRouter = require("../auth/router");
const crudRouter = require("./crud");

router.use(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  authRouter
);
router.use("/", crudRouter);

module.exports = router;
