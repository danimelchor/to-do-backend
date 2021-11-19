// ******* START OF CONFIG ******** //
const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const fs = require("fs");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
};

// Key loading
var PRIV_KEY = process.env.PRIV_KEY;
if (PRIV_KEY === undefined)
  PRIV_KEY = fs.readFileSync(__dirname + "/../../cert/private.pem", "utf8");
var PUB_KEY = process.env.PUB_KEY;
if (PUB_KEY === undefined)
  PUB_KEY = fs.readFileSync(__dirname + "/../../cert/public.pem", "utf8");

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: PUB_KEY,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.sub === 0) {
      return done(null, {});
    } else {
      return done(null, false);
    }
  })
);

const genToken = () => {
  const maxAge = 1000 * 60 * 60 * 24 * 30;
  const jwt_token = jwt.sign(
    {
      iss: "ToDo App",
      sub: 0,
      iat: new Date().getTime(),
      exp: new Date().getTime() + maxAge,
    },
    PRIV_KEY,
    { algorithm: "RS256" }
  );

  return { maxAge, jwt_token };
};
// ******* START OF CONFIG ******** //

// ******* START OF ROUTERS ******** //
const { Router } = require("express");
const router = Router();

router.get(
  "/whoami",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({ user: req.user });
  }
);

router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.PASSWORD) {
    const { jwt_token, maxAge } = genToken();
    res.cookie("jwt", jwt_token, {
      httpOnly: true,
      encode: String,
      secure: process.env.PRODUCTION || false,
      sameSite: "None",
      maxAge,
    });
    res.status(200).json({ ok: true, msg: "Authenticated" });
  } else {
    res.status(403).json({ ok: false, error: "The password is incorrect." });
  }
});

// ******* END OF ROUTERS ******** //

module.exports = router;
