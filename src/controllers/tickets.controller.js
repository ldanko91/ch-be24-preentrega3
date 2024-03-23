import TicketsDBManager from "../dao/dbManagers/TicketsDBManager.js";
const TicketsManager = new TicketsDBManager();
import NewTicketDto from "../dto/ticketDto/newTicketDto/NewTicketDto.js";
import DecreaseStock from "../utils/middlewares/ticketMiddlewares/DecreaseStock.js";
import DelFromCart from "../utils/middlewares/ticketMiddlewares/DelFromCart.js";
import IsInStock from "../utils/middlewares/ticketMiddlewares/IsInStock.js";
import TotalAmount from "../utils/middlewares/ticketMiddlewares/TotalAmount.js";
import { uuid } from "uuidv4";

export default class dbTicketsController {

    createOne = async (newTicketData, cId) => {
        const newTicket = new NewTicketDto(newTicketData)
        let productList = newTicket.products
        newTicket.amount = TotalAmount(productList)
        let stockCheck = await IsInStock(productList)
        let stockProcess = await DecreaseStock(stockCheck.processedProds)
        newTicket.products = stockCheck.processedProds;
        let delFromCart = DelFromCart(cId, stockCheck.processedProds)
        newTicket.code = uuid()
        newTicket.purchase_datetime = Date.now()
        const upload = await TicketsManager.addTicket(newTicket);
        return { upload, newTicket, stockCheck }
    }

    getAll = async () => {
        let download = await TicketsManager.getTickets();
        return download;

    }

    getByCode = async (tCod) => {
        let download = await TicketsManager.getTicketByCode(tCod);
        return download
    }
}
