import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Ola, testando...",
  });
});

export default routes;
