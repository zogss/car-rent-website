import 'dotenv/config';
import server from './start/kernel/app';

const port = process.env.PORT || 3333;

server.app.listen(port, () =>
  console.log(
    `\nExpress Server ready in ${Math.floor(performance.now())} ms
    
➜  Server:   http://localhost:${port}/
    \n`,
  ),
);
