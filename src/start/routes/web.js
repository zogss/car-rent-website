import { Router } from "express";
import AuthController from "../../app/controllers/AuthController";
import PostsController from "../../app/controllers/PostsController";
import UsersController from "../../app/controllers/UsersControllers";
import auth from "../../app/middlewares/auth";

const routes = Router();

routes.get("/", (req, res) => {
  res.redirect("/posts");
});

routes.get("/posts", auth, PostsController.index);
routes.get("/posts/create", auth, PostsController.create);
routes.post("/posts", auth, PostsController.store);
routes.get("/posts/:id", auth, PostsController.show);
routes.get("/posts/:id/edit", auth, PostsController.edit);
routes.get("/posts/:id/rent", auth, PostsController.pay);
routes.put("/posts/:id", auth, PostsController.update);
routes.delete("/posts/:id", auth, PostsController.destroy);

routes.get("/login", AuthController.index);
routes.post("/login", AuthController.store);
routes.get("/register", UsersController.create);
routes.post("/users", UsersController.store);
routes.post("/logout", AuthController.logout);


export default routes;
