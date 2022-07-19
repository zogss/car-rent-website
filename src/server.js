import app from "./start/kernel/app";


app.app.listen(process.env.PORT, () => {
  console.log("Rodando");
});