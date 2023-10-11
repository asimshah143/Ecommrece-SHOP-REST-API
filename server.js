const http = require('http');
const app = require('./app')

const port = process.env.PORT || 3000; //assien a port or default

const server = http.createServer(app);

server.listen(port)