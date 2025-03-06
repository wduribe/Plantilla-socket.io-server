import { Request, Response } from "express";
import { TicketService } from "../services/ticketService";

export class TicketController {

    constructor(
        private readonly ticketService: TicketService
    ) { }

    getTickets = (req: Request, res: Response) => {
        res.json(this.ticketService.getTickets());
    }

    getLastTicketNumber = (req: Request, res: Response) => {
        res.json(this.ticketService.lastTicketNumber);
    }

    createTicket = (req: Request, res: Response) => {
        res.json(this.ticketService.createTicket());
    }

    assignDesk = (req: Request, res: Response) => {
        const { desk, agent } = req.body;

        if (!desk || !agent) {
            res.json({ status: 404, message: 'Desk and agent is required to assign' });
            return;
        }

        res.json(this.ticketService.drawTicket(desk, agent));
    }

    getCurrentTicket = (req: Request, res: Response) => {
        const { agent } = req.params;
        res.json(this.ticketService.getCurrentTicket(agent));
    }

    getPendingTickets = (req: Request, res: Response) => {
        res.json(this.ticketService.pendingTickets.length);
    }

    finishTicket = (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            res.json({ error: 404, message: 'Id ticket is required' });
            return;
        }

        res.json(this.ticketService.onFinishTicket(id));

    }

}