const adminMiddleware = async (req, res, next) => {
  //   console.log(req.user);
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        msg: "You are Not admin",
      });
    }
    return next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = adminMiddleware;
