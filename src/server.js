import 'dotenv/config';
import server from './start/kernel/app';

const port = process.env.PORT || 3333;

server.app.listen(port, () =>
  console.log(`Express server listening on port ${port}`),
);
