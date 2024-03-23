export default class NewProductDto {
    constructor(productInfo) {
        this.code = productInfo.code
        this.title = productInfo.title
        this.description = productInfo.description
        this.price = productInfo.price
        this.thumbnail = productInfo.thumbnail
        this.stock = productInfo.stock
        this.category = productInfo.category
    }
}