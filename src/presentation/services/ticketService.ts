import { uuidAdapter } from '../../config/index';
import { Ticket } from '../../domain/interfaces/ticekt';
import { SocketService } from './socketService';

export class TicketService {

    constructor(
        private socketService: SocketService,
    ) {}

    tickets: Ticket[] = [];

    //Para traer los tickets pendientes sin escritorio
    public get pendingTickets(): Ticket[] {
        return this.tickets.filter(ticket => ticket.done === false && !ticket.handleAtDesk);
    }

    //Para traer el ultimo ticket
    public get lastTicketNumber(): number {
        return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
    }

    //Para traer todos los tickets
    public getTickets(){
        return this.tickets;
    }

    //Para crear un ticket
    public createTicket(): Ticket {

        const newTicket: Ticket = {
            id: uuidAdapter.createUuid(),
            number: this.lastTicketNumber! + 1,
            createdAt: new Date(),
            done: false,
        }
        
        this.tickets.push(newTicket);
        
        this.onGetLastTicket( newTicket.number );
        this.onGetPendingTickets(this.pendingTickets.length);

        return newTicket;

    }

    //Para asignar un escritorio a un ticket pendiente
    public drawTicket( desk: string, agent: string ) {

        const ticket = this.tickets.find(t => !t.handleAtDesk);
        if (!ticket) return { status: 'Error', message: 'No hay tickets pendientes' };

        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();
        ticket.agent = agent;

        this.onGetPendingTickets( this.pendingTickets.length );
        
        //Para traer los tickets con escritorio asignado
        this.onGetWorkingTicket();

        return {
            status: 'Ok',
            ticket,
        }

    }

    //Para traer el ticket que se está atendiendo actualmente
    public getCurrentTicket( agent: string ){
        return this.tickets.find( ticket => !ticket.done && ticket.agent === agent ); 
    } 

    //Para marcar como atendido a un cliente
    public onFinishTicket(ticketId: string) {

        const ticket = this.tickets.find(t => t.id === ticketId);
        if (!ticket) return { status: 'Error', message: 'Ticket no encontrado' };

        this.tickets = this.tickets.map(ticket => {
            if (ticket.id === ticketId) {
                ticket.done = true;
                ticket.handleAt = new Date();
                return ticket;
            }
            return ticket;
        });
        
        this.onGetWorkingTicket();
        
        return {
            status: 'ok'
        }
    }


    //Comunicación con sockets
    private onGetLastTicket( lastTicket: number ){
        this.socketService.sendMessage( 'last-ticket', lastTicket );
    }
    
    private onGetPendingTickets( pending: number ){
        this.socketService.sendMessage( 'pending-tickets', pending );
    }

    private onGetWorkingTicket(){
        this.socketService.sendMessage( 'tickets', this.tickets );
    }    

}