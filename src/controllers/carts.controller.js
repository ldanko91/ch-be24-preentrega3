import CartsDBManager from "../dao/dbManagers/CartsDBManager.js";
const DBCartsManager = new CartsDBManager();

export default class dbCartsController {

    getAll = async()=> {
    let download = await DBCartsManager.getCarts();
    return download;
    
    }

    getById = async(ccod)=> {
    let download = await DBCartsManager.getCartById(ccod);
    return download
    }

    createOne = async(newCart)=> {
    const upload = await DBCartsManager.addCart(newCart);  
    return upload
    }

    addProductToCart = async(cId, pId)=> {
    const upload = await DBCartsManager.addToCartById(cId, pId)  
    return upload
    }

    deleteProductFromCart = async(cId, pId)=> {
        const upload = await DBCartsManager.deleteProductById(cId, pId)  
        return upload    
    }

    updateAllCartProducts = async(cId, products)=> {
        const upload = await DBCartsManager.updateProducts(cId, products)  
        return upload    
    }

    updateProductQuantity = async(cId, pId, newQtty)=> {
        const upload = await DBCartsManager.updateQuantity(cId, pId, newQtty)
        return upload
    }

    emptyCart = async(cId)=> {
        const upload = await DBCartsManager.emptyCart(cId)
        return upload    
    }
}
