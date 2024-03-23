import ProductsDBManager from "../../../dao/dbManagers/ProductsDBManager.js";
const ProductManager = new ProductsDBManager();

const IsInStock = async (productList) => {
    const DBProducts = await ProductManager.getAll();
    const processedProds = [];
    const unProcessedProds = [];

    for (const product of productList) {
        const stockAvailable = DBProducts.find((dbProd) => dbProd.code === product.id.code);

        if (!stockAvailable) {
            unProcessedProds.push(product);
            continue;
        }

        if (stockAvailable.stock >= product.quantity && stockAvailable.status === true) {
            processedProds.push(product);
        } else {
            unProcessedProds.push(product);
        }
    }

    return { processedProds, unProcessedProds };
};

export default IsInStock;
