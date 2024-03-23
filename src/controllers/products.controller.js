import FactoryProductManager from "../dao/factories/productFactory/productFactory.js";
const ProductManager = new FactoryProductManager();

export default class dbProductsController {

    getAll = async (queryData) => {
        let download = await ProductManager.getProducts(queryData);
        return download;
    }

    getProductByCode = async(pcod)=> {
        let download = await ProductManager.getProductByCode(pcod);
    return download
    }

    createOne = async(newProd)=> {
        const upload = await ProductManager.addProduct(newProd);  
    return upload
    }

    updateProductById = async (updCode, updProd) => {
        const upload = await ProductManager.updateProductByCode(updCode, updProd)  
    return upload
    }

    deleteProductByCod = async (cod) => {
        const upload = await ProductManager.deleteProductByCode(cod)
        return upload    
    }
}
