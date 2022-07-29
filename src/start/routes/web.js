import { Router } from "express";
import AuthController from "../../app/controllers/AuthController";
import PostsController from "../../app/controllers/PostsController";
import UsersController from "../../app/controllers/UsersControllers";
import auth from "../../app/middlewares/auth";
import upload from "../../config/multer";

const routes = Router();

routes.get("/", (req, res) => {
  res.redirect("/posts");
});

//* Posts
routes.get("/posts", auth, PostsController.index);
routes.get("/posts/create", auth, PostsController.create);
routes.post("/posts", auth, upload.single("fileName"), PostsController.store);
routes.get("/posts/:id", auth, PostsController.show);
routes.get("/posts/:id/edit", auth, PostsController.edit);
routes.put(
  "/posts/:id",
  auth,
  upload.single("fileName"),
  PostsController.update
);
routes.delete("/posts/:id", auth, PostsController.destroy);

//* Users
routes.get("/login", AuthController.index);
routes.post("/login", AuthController.store);
routes.get("/register", UsersController.create);
routes.post("/users", UsersController.store);
routes.post("/logout", AuthController.logout);

//* Wildcard routes
routes.get("/*", async (req, res, next) =>{
  return res.redirect("/")
});


export default routes;
