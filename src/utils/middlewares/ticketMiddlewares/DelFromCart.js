import CartsDBManager from "../../../dao/dbManagers/CartsDBManager.js";
const CartManager = new CartsDBManager();

const DelFromCart = async (cId, processedProds) => {

    for (const product of processedProds) {
        const dbProd = await CartManager.deleteProductById(cId, product.id.code);
    }
    return
};

export default DelFromCart;