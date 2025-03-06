import { Server } from 'http';
import { Server as ServerSocket } from 'socket.io';


interface Options {
	server: Server;
}

export class SocketService {

	private static _instance: SocketService;
	private io: ServerSocket;

	private constructor(options: Options) {
		const { server } = options;

		this.io = new ServerSocket(server);
		this.start();

	}

	static get instance(): SocketService {

		if (!SocketService._instance) {
			throw 'Socket.io is not initializated';
		}

		return SocketService._instance;
	}

	static initSocket(options: Options) {
		const { server } = options;
		SocketService._instance = new SocketService({ server });
	}

	public sendMessage(type: string, payload: Object) {
		this.io.emit(type, payload);
	}

	public start() {

		this.io.on('connection', () => {

			console.log('Client connected');

		});

	}

}