import cartsModel from "../../models/carts.js";
import productsModel from "../../models/products.js";
import { ObjectId } from "mongoose";

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
            let carrito = await cartsModel.findOne({ _id: getCode }).lean().populate({ path: 'products.id', model: productsModel });
            // console.log(carrito)
            return carrito
        } catch (error) {
            console.log(error)
        }
    }

    addToCartById = async (cId, pId) => {
        try {
            let carrito = await cartsModel.findOne({ _id: cId });
            let prodsInCart = carrito.products;
            const newProd = { id: { _id: pId }, quantity: 1 }
            prodsInCart.push(newProd);
            let upload = await cartsModel.updateOne({ _id: cId }, { products: prodsInCart });
            return upload
        } catch (error) {
            console.log(error)
        }
    }

    deleteProductById  = async(cartId,prodId)=>{
        let carrito = await cartsModel.findOne({_id:cartId}).lean();
        let prodsInCart = carrito.products;
        let delIndex = prodsInCart.findIndex(producto => producto.id == prodId)
        prodsInCart.splice(delIndex,1)
        let updateObject = {
            $set: { products: prodsInCart }
        };
        let upload = await cartsModel.updateOne({ _id: cartId }, updateObject);
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
        let carrito = await cartsModel.findOne({_id:cId}).lean();
        let upload = await cartsModel.updateOne({ _id: cId }, { products: [] });
        return upload
    }
}