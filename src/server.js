import app from "./start/kernel/app";


const server = app.app.listen(process.env.PORT || 3333, () => {
  console.log("Express server listening on port %d", server.address().port);
});