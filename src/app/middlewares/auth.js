const auth = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/login');
  } catch (error) {
    return res.redirect('/login');
  }
};

export default auth;
