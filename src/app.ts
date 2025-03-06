import { createServer } from 'http';
import { Server } from './presentation/server';
import { SocketService } from './presentation/services/socketService';
import { envsAdapter } from './config';
import { AppRoutes } from './presentation/routes';



(() => {
	main();
})();

function main() {

	const server = new Server({
		port: envsAdapter.PORT, 
	});

	const httpServer = createServer( server.app );

	SocketService.initSocket({
		server: httpServer,
	});

	server.setRoutes( AppRoutes.routes );

	httpServer.listen( envsAdapter.PORT, () => {
		console.log(`Server is running on port: ${ envsAdapter.PORT }`);
	});

}