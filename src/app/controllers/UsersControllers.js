import Users from "../models/Users";
import schema from "../schemas/userSchema"

class UsersController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    // armazenar dados do model no banco de dados
    try {
      if (req.body.password !== req.body.password_confirmation){
        console.log("bunda")
        req.flash("error_message", "As senhas não batem!");
        res.redirect("/register")
      }else{
        const data = await schema.validate(req.body);
        const user = await Users.create(data);
        req.login(user, (err) => {
        if (err) {
          req.flash("error_message", "Erro inesperado ao registrar, tente novamente!");
          res.redirect("/register");
        }
        res.redirect("/");
      });
      }
    } catch (error) {
      req.flash("error_message", "Erro inesperado ao registrar, tente novamente!");
      res.redirect("/register");
    }
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async create(req, res) {
    return res.render("users/create", { layout: "auth" });
  }
}
export default new UsersController();
