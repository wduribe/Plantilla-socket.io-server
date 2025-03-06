import { Router } from "express";
import { TicketRoutes } from "./ticket/ticket.routes";

export class AppRoutes {

    static get routes(): Router{

        const router = Router();

        router.use( '/api', TicketRoutes.routes );

        return router;
    }

} 