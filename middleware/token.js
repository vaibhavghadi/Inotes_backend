const jwt = require("jsonwebtoken");

function check(req, res, next) {
  const token = req.header("auth");
  if (!token) {
    res.status(400).json({ error: "token is not there" });
  } else {
    const data = jwt.verify(token, "vaibhav");
    if (!data) {
      res.status(400).json({ error: "token is not valid" });
    } else {
      console.log(data);
      req.user = data.user;
      next();
    }
  }
}

module.exports = check;
