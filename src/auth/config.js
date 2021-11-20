const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const { PUB_KEY } = require("./keys");

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
