import express, { Router } from 'express';
import cors from 'cors';
import path from 'path';

interface Options {
    port: number,
    publicPath?: string,
}

export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor( options: Options ){

        const { port, publicPath = 'public' } = options;
        this.port = port;
        this.publicPath = publicPath;

        this.configure();

    }

    setRoutes( router: Router ){
        this.app.use( router );
    }

    private configure(){

        //* Middlewares
        this.app.use( express.json() );
        this.app.use( express.urlencoded( { extended: true } ));

        //*Public folder
        this.app.use( express.static( this.publicPath ) );

        //*Configuration cors
        this.app.use( cors() );

        //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
        this.app.get(/^\/(?!api).*/, (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });

    }

    start(){
        this.app.listen( this.port, () => {
            console.log( `Server is running on port: ${ this.port }` );
        });
    }

}