import ProductsDBManager from "../dao/dbManagers/ProductsDBManager.js";
const DBProductsManager = new ProductsDBManager();

export default class dbProductsController {

    getAll = async(pageq, limitq, filterByq, sortByq, sortOrderq)=> {
    let download = await DBProductsManager.getProducts(pageq, limitq, filterByq, sortByq, sortOrderq);
    return download;
    
    }

    getProductByCode = async(pcod)=> {
    let download = await DBProductsManager.getProductByCode(pcod);
    return download
    }

    createOne = async(newProd)=> {
    const upload = await DBProductsManager.addProduct(newProd);  
    return upload
    }

    updateProductById = async(pid,updProd)=> {
    const upload = await DBProductsManager.updateProductByCode(pid,updProd)  
    return upload
    }

    deleteProductById = async(pid)=> {
        const upload = await DBProductsManager.deleteProductByCode(pid)
        return upload    
    }
}
