export default class ProductQueryDto {
    constructor(queryInfo) {
        this.pageq = queryInfo.pageq || 1
        this.limitq = queryInfo.limitq || 10
        this.filterByq = queryInfo.filterBy
        this.sortByq = queryInfo.sortByq || "price"
        this.sortOrderq = queryInfo.sortOrder || "asc"
    }
}