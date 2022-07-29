import Users from "../models/Users";
import schema from "../schemas/userSchema";

class UsersController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    // armazenar dados do model no banco de dados
    try {
      const errors = [];

      if (
        !req.body.name ||
        typeof req.body.name == undefined ||
        req.body.name == null
      ) {
        errors.push({ text: "Nome inválido!" });
      }
      if (
        !req.body.email ||
        typeof req.body.email == undefined ||
        req.body.email == null
      ) {
        errors.push({ text: "E-mail inválido!" });
      }
      if (
        !req.body.password ||
        typeof req.body.password == undefined ||
        req.body.password == null
      ) {
        errors.push({ text: "Senha inválida!" });
      }
      if (req.body.password.length < 8) {
        errors.push({ text: "A senha deve conter no mínimo 8 caracteres!" });
      }
      if (req.body.password !== req.body.password_confirmation) {
        errors.push({ text: "As senhas são diferentes, tente novamente!" });
      }
      if (errors.lenght > 0) {
        return res.render("users/create", { errors: errors });
      } else {
        const user = await Users.findOne({ email: req.body.email })
        if(user){
          req.flash("error_message", "Já existe um usuário registrado com este e-mail!")
          return res.redirect("/register")
        }else{
          const data = await schema.validate(req.body);
          const userCreation = await Users.create(data);
          req.login(userCreation, (err) => {
            if (err) {
              req.flash(
                "error_message",
                "Erro inesperado ao criar o usuário, tente novamente!"
              );
              return res.redirect("/register");
            }
            return res.redirect("/");
          });
        }
      }
    } catch (error) {
      req.flash(
        "error_message",
        "Erro inesperado ao criar o usuário, tente novamente!"
      );
      return res.redirect("/");
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
