import User from "../models/Users";

class AuthController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    return res.render("auth/login", { layout: "auth" });
  }
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    // login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error_message", "Usuário não encontrado!");
      return res.status(401).redirect("/login");
    }
    if (!(await user.comparePassword(password))) {
      req.flash("error_message", "Senha incorreta!");
      return res.status(401).redirect("/login");
    }
    req.login(user, (err) => {
      if (err) {
        return res.redirect("/login");
      }
      return res.redirect("/");
    });
  }
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async logout(req, res) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/login");
    });
  }
}

export default new AuthController();
