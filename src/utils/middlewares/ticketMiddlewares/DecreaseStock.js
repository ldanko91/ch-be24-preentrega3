import ProductsDBManager from "../../../dao/dbManagers/ProductsDBManager.js";
const ProductManager = new ProductsDBManager();

const DecreaseStock = async (processedProds) => {
    for (const product of processedProds) {
        const dbProd = await ProductManager.getProductByCode(product.id.code);
        const newStock = dbProd[0].stock - product.quantity;
        await ProductManager.updateProductByCode(dbProd[0].code, { stock: newStock });
    }

};

export default DecreaseStock;