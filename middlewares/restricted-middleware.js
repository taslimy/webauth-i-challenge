// middleware
module.exports = function restricted(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: "you shall not pass" });
  }
};
