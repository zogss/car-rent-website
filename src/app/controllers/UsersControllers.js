import Users from "../models/Users";
import * as Yup from "yup";

class UsersController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    // armazenar dados do model no banco de dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(8),
      password_confirmation: Yup.string()
        .required()
        .min(8)
        .oneOf([Yup.ref("password"), null]),
    });
    const data = await schema.validate(req.body);
    const user = await Users.create(data);
    req.login(user, (err) => {
      if (err) {
        return res.redirect("/register");
      }
      return res.redirect("/");
    });
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
