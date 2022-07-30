import express from "express";
import web from "../routes/web";
import api from "../routes/api";
import MongoProvider from "../../providers/MongoProvider";
import { engine } from "express-handlebars";
import path from "path";
import morgan from "morgan";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import viewHelpers from "./view-helpers";
import Handlebars from "handlebars";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionConfig from "../../config/session";
import passport from "passport";
import PassportProvider from "../../providers/PassportProvider";
import flash from "connect-flash";

class App {
  //* short paths here
  viewsPath = path.resolve(__dirname, "..", "..", "resources", "views");
  publicPath = path.resolve(__dirname, "..", "..", "public");
  filesPath = path.resolve(__dirname, "..", "..", "..", "tmp", "uploads");

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.registerProviders();
  }
  middlewares() {
    //* all middlewares stay here
    this.app.engine(
      "hbs",
      engine({
        extname: ".hbs",
        helpers: viewHelpers,
        handlebars: allowInsecurePrototypeAccess(Handlebars),
      })
    );
    this.app.use("/public", express.static(this.publicPath));
    this.app.use("/files", express.static(this.filesPath));
    this.app.set("view engine", "hbs");
    this.app.set("views", this.viewsPath);
    this.app.use(cookieParser());
    this.app.use(session(sessionConfig));
    this.app.use(passport.authenticate("session"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(methodOverride("_method"));
    this.app.use(morgan("dev"));
    this.app.use(flash());
    this.app.use((req, res, next) => {
      res.locals.error_message = req.flash("error_message");
      res.locals.success_message = req.flash("success_message");
      res.locals.user = req.user || null;
      next();
    });
  }
  routes() {
    //* all routes here
    this.app.use("/", web);
    this.app.use("/api", api);
  }
  registerProviders() {
    //* mongo boot
    MongoProvider.boot();
    PassportProvider.boot();
  }
}

export default new App();
