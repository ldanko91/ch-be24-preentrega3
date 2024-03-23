import FactoryCartManager from "../dao/factories/carts/cartsFactory.js";
const CartsManager = new FactoryCartManager();

export default class dbCartsController {

    getAll = async()=> {
        let download = await CartsManager.getCarts();
    return download;
    
    }

    getById = async(ccod)=> {
        let download = await CartsManager.getCartById(ccod);
    return download
    }

    createOne = async(newCart)=> {
        const upload = await CartsManager.addCart(newCart);  
    return upload
    }

    addProductToCart = async(cId, pId)=> {
        const upload = await CartsManager.addToCartById(cId, pId)  
    return upload
    }

    deleteProductFromCart = async(cId, pId)=> {
        const upload = await CartsManager.deleteProductById(cId, pId)  
        return upload    
    }

    updateAllCartProducts = async(cId, products)=> {
        const upload = await CartsManager.updateProducts(cId, products)  
        return upload    
    }

    updateProductQuantity = async(cId, pId, newQtty)=> {
        const upload = await CartsManager.updateQuantity(cId, pId, newQtty)
        return upload
    }

    emptyCart = async(cId)=> {
        const upload = await CartsManager.emptyCart(cId)
        return upload    
    }
}
