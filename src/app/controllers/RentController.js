import Posts from "../models/Posts";
import Rent from "../models/Rent";
// import Users from "../models/Users";
// import schema from "../schemas/postSchema";

class RentController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    //* armazenar dados do model no banco de dados
    await Rent.create({
      user: req.user._id,
      cars: req.params.id,
      rentTime: "tempo aleatorio",
      rentCar: "retorno de carro",
      return: false,
    });

    return res.redirect("/posts");
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    //* mostra os models
    const rent = await Rent.find({ user: req.user._id }).populate("cars");
    return res.render("rents/index", { rent });
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async show(req, res) {}
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async update(req, res) {}
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async destroy(req, res) {
    try {
      const rentUser = await Rent.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

      if (rentUser) {
        await rentUser.remove();
        req.flash("success_message", "Aluguel removido com sucesso!");
        return res.redirect("/rentals");
      } else {
        req.flash(
          "error_message",
          "Erro ao remover o aluguel, tente novamente!"
        );
        return res.redirect("/rentals");
      }
    } catch (err) {
      req.flash("error_message", "Erro ao remover o aluguel, tente novamente!");
      return res.redirect("/rentals");
    }
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async create(req, res) {
    const post = await Posts.findById(req.params.id);
    return res.render("rents/create", { post });
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async edit(req, res) {}
}

export default new RentController();
