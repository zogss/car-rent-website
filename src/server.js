import "dotenv/config";
import app from "./start/kernel/app";

const port = process.env.PORT || 3333;

app.app.listen(port, () =>
  console.log(`Express server listening on port ${port}`)
);
