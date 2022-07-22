import * as Yup from "yup";
import Posts from "../models/Posts";
import Users from "../models/Users";
import schema from "../schemas/postSchema";
class PostsController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    // armazenar dados do model no banco de dados
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        model: Yup.string().required(),
        brand: Yup.string().required(),
        year: Yup.number().required(),
        valuePerDay: Yup.string().required(),
        plate: Yup.string().required(),
        size: Yup.string().required(),
        maxSpeed: Yup.number().required(),
      });

      const data = await schema.validate(req.body);
      const cars = await Posts.find({ seller: req.user._id });

      let errors = [];

      if (
        !req.body.title ||
        typeof req.body.title == undefined ||
        req.body.title == null
      ) {
        errors.push({ text: "Título invalido" });
      }
      if (
        !req.body.model ||
        typeof req.body.model == undefined ||
        req.body.model == null
      ) {
        errors.push({ text: "Modelo invalido" });
      }
      if (
        !req.body.brand ||
        typeof req.body.brand == undefined ||
        req.body.brand == null
      ) {
        errors.push({ text: "Marca invalida" });
      }
      if (
        !req.body.valuePerDay ||
        typeof req.body.valuePerDay == undefined ||
        req.body.valuePerDay == null
      ) {
        errors.push({ text: "Valor diário invalido" });
      }
      if (
        !req.body.plate ||
        typeof req.body.plate == undefined ||
        req.body.plate == null
      ) {
        errors.push({ text: "Placa invalida" });
      }
      if (
        !req.body.size ||
        typeof req.body.size == undefined ||
        req.body.size == null
      ) {
        errors.push({ text: "Comprimento invalido" });
      }
      if (
        !req.body.maxSpeed ||
        typeof req.body.maxSpeed == undefined ||
        req.body.maxSpeed == null
      ) {
        errors.push({ text: "Velocidade máxima invalida" });
      }
      if (cars.length >= 7) {
        errors.push({ text: "Número máximo de posts atingido" });
      }
      if (errors.length > 0) {
        res.render("posts/create", { errors: errors });
      } else {
        await Posts.create({ ...data, seller: req.user._id });
        req.flash("success_message", "Post criado com sucesso!");
        res.redirect("/posts");
      }
    } catch (error) {
      req.flash("error_message", "Erro ao criar o post, tente novamente!");
      res.redirect("/posts");
    }
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    // listagem dos models no banco de dados
    const posts = await Posts.find();
    res.render("posts/index", { posts });
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async show(req, res) {
    // mostrar um model no banco de dados
    try {
      const post = await Posts.findById(req.params.id).populate("seller");
      if (!post) {
        return res.status(404).render("errors/404");
      }
      res.render("posts/show", { post });
    } catch (error) {
      return res.status(404).render("errors/404");
    }
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async update(req, res) {
    // atualizar um model no banco de dados
    try {
      const post = await Posts.findById(req.params.id);

      let errors = [];

      if (
        !req.body.title ||
        typeof req.body.title == undefined ||
        req.body.title == null
      ) {
        errors.push({ text: "Título invalido" });
      }
      if (
        !req.body.model ||
        typeof req.body.model == undefined ||
        req.body.model == null
      ) {
        errors.push({ text: "Modelo invalido" });
      }
      if (
        !req.body.brand ||
        typeof req.body.brand == undefined ||
        req.body.brand == null
      ) {
        errors.push({ text: "Marca invalida" });
      }
      if (
        !req.body.valuePerDay ||
        typeof req.body.valuePerDay == undefined ||
        req.body.valuePerDay == null
      ) {
        errors.push({ text: "Valor diário invalido" });
      }
      if (
        !req.body.plate ||
        typeof req.body.plate == undefined ||
        req.body.plate == null
      ) {
        errors.push({ text: "Placa invalida" });
      }
      if (
        !req.body.size ||
        typeof req.body.size == undefined ||
        req.body.size == null
      ) {
        errors.push({ text: "Comprimento invalido" });
      }
      if (
        !req.body.maxSpeed ||
        typeof req.body.maxSpeed == undefined ||
        req.body.maxSpeed == null
      ) {
        errors.push({ text: "Velocidade máxima invalida" });
      }
      if (errors.length > 0) {
        res.render("posts/create", { errors: errors });
      } else {
        await post.updateOne(data);
        req.flash("success_message", "Post editado com sucesso!");
        res.redirect("/posts")
      }
    } catch (error) {
      req.flash("error_message", "Erro ao editar o post, tente novamente!");
      res.redirect("/posts");
    }
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async destroy(req, res) {
    // deletar um model no banco de dados
    try {
      const post = await Posts.findById(req.params.id);
      const user = await Users.findById(req.session.passport.user);

      if (!post || !user) {
        return res.status(400).render("errors/404");
      }

      if (post.seller.toString() == user._id.toString()) {
        await post.remove();
        res.redirect("/posts");
      } else {
        return res.status(404).render("errors/404");
      }
    } catch (err) {
      return res.status(404).render("errors/404");
    }
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async create(req, res) {
    // exibir a tela de criação do model para o usuário
    res.render("posts/create");
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async edit(req, res) {
    // exibir a tela de edição do model para o usuário
    try {
      const post = await Posts.findById(req.params.id);
      const user = await Users.findById(req.session.passport.user);

      if (!post || !user) {
        return res.status(404).render("errors/404");
      }
      if (post.seller.toString() == user._id.toString()) {
        res.render("posts/edit", { post });
      } else {
        return res.status(404).render("errors/404");
      }
    } catch (err) {
      return res.status(400).render("errors/404");
    }
  }
}

export default new PostsController();
