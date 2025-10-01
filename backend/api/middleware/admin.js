const adminMiddleware = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
// console.log("authorized usr admin");
  next();
};

module.exports = adminMiddleware;
