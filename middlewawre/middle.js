const jwt = require("jsonwebtoken");

const middle = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(400).json({ error: "token is not there" });
  }

  try {
    const status = jwt.verify(token, "vaibhav");

    req.user = status.user;
    next();
  } catch (error) {
    return res.status(400).json({ error: "enter valid token " });
  }
};

module.exports = middle;
