import { Server } from 'http';
import { Server as ServerSocket } from 'socket.io';


interface Options {
    server: Server;
}

export class SocketService {

    private static _instance: SocketService;
    private io: ServerSocket;

    private constructor( options: Options ){
        const { server } = options;

        this.io = new ServerSocket( server );

        //*Start socket server
        this.start();

    }

    static get instance(): SocketService {
        if( !SocketService._instance ){
            throw 'Socket.io is not initializated';
        }

        return SocketService._instance;
    }

    static initSocket( options: Options ){
        const { server } = options;
        SocketService._instance = new SocketService( { server } );
    }

    public start(){
        this.io.on( 'connection', ( socket ) =>{
            console.log( 'Client connected' );  
        
            //* Primer mensaje que se envia al cliente cuando se conecta por primera vez
            // socket.emit( 'mensaje-bienvenida', 'Bienvendio a Interrapidisimo' );

            //* Escuchando los eventos de los clientes
            // socket.on('payload del mensaje', (data) => {

            //     this.io.emit('message-from-server', data); --> Emite el mensaje a todos los usuarios
            // });
        });

    }

}