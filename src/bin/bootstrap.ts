
import * as http from 'http';

import Server from './server'; 

const server = http.createServer(Server);
server.listen(3000);
server.on('listening', onListening);

function onListening(): void {
    console.log('listening on 3000');
}