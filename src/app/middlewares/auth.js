/**
 * @type {import('express').RequestHandler}
 */
export default (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/login");
  } catch (error) {
    return res.redirect("/login");
  }
};
