const TotalAmount = (productList) => {
    let totalAmount = 0;

    for (const product of productList) {
        totalAmount += product.id.price * product.quantity;
    }

    return totalAmount;
}

export default TotalAmount