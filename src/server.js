import 'dotenv/config';
import server from './start/kernel/app';

const port = process.env.PORT || 3333;
const appUrl = process.env.APP_URL || `http://localhost:${port}`;

server.app.listen(port, () =>
  console.log(
    `\nExpress Server ready in ${Math.floor(performance.now())} ms
    
➜  Server: ${appUrl}
    \n`,
  ),
);
