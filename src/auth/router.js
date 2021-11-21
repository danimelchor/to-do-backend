const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { PRIV_KEY } = require("./keys");

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

router.post("/login", (req, res) => {
  const { password, type } = req.body;

  if (password === process.env.PASSWORD) {
    const { jwt_token, maxAge } = genToken();
    res.cookie("jwt", jwt_token, {
      httpOnly: true,
      encode: String,
      secure: process.env.PRODUCTION ? true : false,
      sameSite: "None",
      maxAge,
    });

    if (type === "react") res.redirect(process.env.FRONTEND);
    else res.status(200).json({ ok: true, msg: "Authenticated" });
  } else {
    res.status(403).json({ ok: false, error: "The password is incorrect." });
  }
});

module.exports = router;
