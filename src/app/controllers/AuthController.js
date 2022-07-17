import User from "../models/Users";

class AuthController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    res.render("auth/login", { layout: "auth" });
  }
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).redirect("/login");
    }
    if (!(await user.comparePassword(password))) {
      return res.status(401).redirect("/login");
    }
    req.login(user, (err) => {
      if (err) {
        return res.redirect("/login");
      }
      return res.redirect("/");
    });
  }
}

export default new AuthController();
