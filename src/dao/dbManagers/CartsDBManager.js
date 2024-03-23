import cartsModel from "../../models/carts.js";
import productsModel from "../../models/products.js";

export default class CartsDBManager {
    constructor(){
        console.log('Conectado a Carts de MongoDB')
    }

    addCart = async (newCart) =>  {
        let upload = await cartsModel.create(newCart);
        return upload
    }

    getCarts = async (req, res) => {
        try {
            let carritos = await cartsModel.find({}, { __v: 0 }).lean().populate({ path: 'products.product' });
            return carritos
        } catch (error) {
            console.log(error)
        }
    }

    getCartById = async (getCode) => {
        try {
            let carrito = await cartsModel.findOne({ code: getCode }).lean().populate({ path: 'products.id', model: productsModel });
            return carrito
        } catch (error) {
            console.log(error)
        }
    }

    addToCartById = async (cId, pId) => {
        try {
            let product = await productsModel.findById(pId)
            let prodCod = product.code
            let carrito = await cartsModel.findOne({ code: cId }).populate({ path: 'products.id', model: productsModel });
            let prodsInCart = carrito.products
            function getIndexByCode(prodsInCart, codeToSearch) {
                for (let i = 0; i < prodsInCart.length; i++) {
                    if (prodsInCart[i].id.code === codeToSearch) {
                        return i;
                    }
                }
                return -1;
            }
            const codeToSearch = prodCod;
            const index = getIndexByCode(prodsInCart, codeToSearch);
            if (index > -1) {
                prodsInCart[index].quantity += 1;
            } else {
                const newProd = { id: pId, quantity: 1 };
                prodsInCart.push(newProd);
            }
            let upload = await cartsModel.updateOne({ code: cId }, { products: prodsInCart });
            return upload
        } catch (error) {
            console.log(error)
        }
    }

    deleteProductById  = async(cartId,prodId)=>{
        let carrito = await cartsModel.findOne({ code: cartId }).lean();
        let prodsInCart = carrito.products;
        // console.log(prodsInCart)
        let delIndex = prodsInCart.findIndex(producto => producto.id == prodId)
        console.log(delIndex)
        prodsInCart.splice(delIndex,1)
        let updateObject = {
            $set: { products: prodsInCart }
        };
        let upload = await cartsModel.updateOne({ code: cartId }, updateObject);
        return upload
    }

    updateProducts = async (cId, newProducts) => {
        let carrito = await cartsModel.findOne({_id:cId}).lean();
        carrito.products = []
        let upload = await cartsModel.updateOne({ _id: cId }, newProducts);
        return upload
    }

    updateQuantity  = async(cId,pId,newQtty)=>{
        let carrito = await cartsModel.findOne({_id:cId}).lean();
        let prodsInCart = carrito.products;
        let updIndex = prodsInCart.findIndex(producto => producto.id == pId)
        prodsInCart.splice(updIndex, 1);
        const newProd = { id: pId, quantity: newQtty }
        prodsInCart.push(newProd)
        let upload = await cartsModel.updateOne({ _id: cId }, { products: prodsInCart });
        return upload
    }

    emptyCart = async(cId)=>{
        let upload = await cartsModel.updateOne({ code: cId }, { products: [] });
        return upload
    }
}