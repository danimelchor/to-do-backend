const { Router } = require("express");
const router = Router();
// const passport = require("../auth/config");
const authRouter = require("../auth/router");
const crudRouter = require("./crud");

const ensureAuthenticated = (req, res, next) => {
  var { API_KEY } = req.body;
  if (API_KEY === process.env.PASSWORD) {
    next();
    return;
  }
  var { API_KEY } = req.query;
  if (API_KEY === process.env.PASSWORD) {
    next();
    return;
  } else {
    res.status(401).send("Unauthorized");
    return;
  }
};

router.use("/auth", authRouter);
router.use("/", ensureAuthenticated, crudRouter);

module.exports = router;
