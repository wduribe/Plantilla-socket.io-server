import { createServer } from 'http';
import { Server } from './presentation/server';
import { SocketService } from './presentation/services/socketService';



(() => {
    main();
})();


function main(){
    
    const server = new Server({
        port: 3000,
    });

    const httpServer = createServer( server.app );

    SocketService.initSocket({
        server: httpServer,
    });

    httpServer.listen( 3000, () => {
        console.log( `Server is running on port: ${ 3000 }` );
    });

}