import productsModel from "../../models/products.js";
import ticketsModel from "../../models/tickets.js";

export default class TicketsDBManager {
    constructor() {
        console.log('Conectado a Tickets de MongoDB')
    }

    addTicket = async (newTicket) => {
        let upload = await ticketsModel.create(newTicket);
        return upload
    }

    getTickets = async (req, res) => {
        try {
            let tickets = await ticketsModel.find({}, { __v: 0 }).lean().populate({ path: 'products.id', model: productsModel });
            return tickets
        } catch (error) {
            console.log(error)
        }
    }

    getTicketByCode = async (getCode) => {
        try {
            let ticket = await ticketsModel.findOne({ code: getCode }).lean().populate({ path: 'products.id', model: productsModel });
            return ticket
        } catch (error) {
            console.log(error)
        }
    }

}