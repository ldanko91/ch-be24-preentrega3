export default class NewTicketDto {
    constructor(ticketInfo) {
        this.products = ticketInfo.products
        this.code = ""
        this.amount = 0
        this.purchaser = ticketInfo.email
        this.purchase_datetime = ""
    }
}