import * as Yup from "yup";
import Posts from "../models/Posts";

class PostsController {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    // armazenar dados do model no banco de dados
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string().required(),
    });
    const data = await schema.validate(req.body);
    await Posts.create({ ...data, seller: req.user._id });
    res.redirect("/posts");
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
      if (!post) {
        return res.status(404).render("errors/404");
      }
      const schema = Yup.object().shape({
        title: Yup.string(),
        content: Yup.string(),
      });
      const data = await schema.validate(req.body);
      await post.updateOne(data);
      res.redirect("/posts");
    } catch (err) {
      return res.status(404).render("errors/404");
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
      if (!post) {
        return res.status(404).render("errors/404");
      }
      await post.remove();
      res.redirect("/posts");
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
      if (!post) {
        return res.status(400).render("errors/404");
      }
      res.render("posts/edit", { post });
    } catch (err) {
      return res.status(400).render("errors/404");
    }
  }
}

export default new PostsController();
