import { Router } from "express";
import { TicketController } from "./ticket.controller";
import { TicketService } from "../services/ticketService";
import { SocketService } from "../services/socketService";

export class TicketRoutes {

    static get routes(): Router{
        const router = Router();

        const socketService =  SocketService.instance
        const ticketService = new TicketService( socketService );
        const ticketController = new TicketController( ticketService );
        
        router.get( '/tickets', ticketController.getTickets );
        router.get( '/last-ticket', ticketController.getLastTicketNumber );
        router.get( '/current-ticket/:agent', ticketController.getCurrentTicket );
        router.get( '/pending-ticket', ticketController.getPendingTickets );
        router.get( '/finish-ticket/:id', ticketController.finishTicket );
        
        router.post( '/create-ticket', ticketController.createTicket );
        router.post( '/assign-ticket', ticketController.assignDesk );

        return router;
    }



}