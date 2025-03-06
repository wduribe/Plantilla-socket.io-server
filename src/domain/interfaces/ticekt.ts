


export interface Ticket {

    id: string,
    agent?: string, //Agente que atendió
    number: number, //Numero del ticket por ejemplo 1,2,3,4
    createdAt: Date; //Fecha en que se creó
    handleAtDesk?: string, //Se le asigna el escritorio en que se está atendiendo
    handleAt?: Date; //Fecha en la que se empezó a atender el ticket 
    done: boolean; //Nos indica si ya fué finalizado el ticket

}  