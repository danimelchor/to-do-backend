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

module.exports = passport;
