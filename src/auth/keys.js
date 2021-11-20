const fs = require("fs");

// Key loading
var PRIV_KEY = process.env.PRIV_KEY;
if (PRIV_KEY === undefined)
  PRIV_KEY = fs.readFileSync(__dirname + "/../../cert/private.pem", "utf8");
var PUB_KEY = process.env.PUB_KEY;
if (PUB_KEY === undefined)
  PUB_KEY = fs.readFileSync(__dirname + "/../../cert/public.pem", "utf8");

module.exports = { PRIV_KEY, PUB_KEY };
