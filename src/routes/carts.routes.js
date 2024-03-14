import { Router } from "express";
import CartManager from "../models/CartManager.js";

const cartsRouter = Router();
const cartsManager1 = new CartManager()

cartsRouter.get('/', async (req,res)=>{
    let {limit} = req.query
    
    if (limit){
        const carritos = await cartsManager1.getCarts();
        const limitCarts = carritos.slice(0,(limit))
        res.send(limitCarts)     
    
    }else{
    const carritos = await cartsManager1.getCarts();
    res.send(carritos)
    }
})

cartsRouter.get('/:cid', async (req,res)=>{
    const cId = parseInt(req.params.cid)
    const carrito = await cartsManager1.getCartById(cId);
    res.send(carrito)
})

cartsRouter.post('/', async(req,res)=>{
    let newCartProds = await (req.body);
    console.log("Este " + newCartProds)
    let cargaNewCart = cartsManager1.addCart(newCartProds); 
    res.send('El nuevo carrito fue cargado correctamente')
})

cartsRouter.post('/:cid/product/:pid', async(req,res)=>{
    let cartId = parseInt(req.params.cid);
    let prodId = parseInt(req.params.pid);
    let data = {
        cartId:cartId,
        prodId:prodId
    }
    let updCart = cartsManager1.updateCartProductById(data); 
    res.send(`El producto con id ${prodId} del carrito con id ${cartId} fue actualizado correctamente`)
})

cartsRouter.delete('/:cid', async (req,res)=>{
    const cId = parseInt(req.params.cid)
    const carrito = await cartsManager1.deleteCartById(cId);
    res.send('El carrito con ID: '+cId+' fue eliminado')
})

export default cartsRouter;