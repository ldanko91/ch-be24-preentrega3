import { Router } from "express";
const dbCartsRouter = Router();
import dbCartsController from "../controllers/carts.controller.js";
const DBCartsController = new dbCartsController();

dbCartsRouter.get('/', async(req,res)=>{
    let carritos = await DBCartsController.getAll();
    res.render('carts',{
        carritos,
        title: `Listado de carritos`
    }) 
})

dbCartsRouter.get('/:ccod', async(req,res)=>{
    let {ccod} = req.params
    let download = await DBCartsController.getById(ccod);
    let products = download.products;
    console.log(products);
    res.render('cartDetail', {
        ccod, products,
        title: `Productos en carrito código: ${ccod}`
    }) 
})

dbCartsRouter.post('/', async(req,res)=>{
    const newCart = req.body;    
    const upload = await DBCartsController.createOne(newCart);
    res.send({status:"success", payload:upload})
})

dbCartsRouter.put('/:cId/products/:pId', async (req, res) => {
    const { cId, pId } = req.params;
    const addToCart = await DBCartsController.addProductToCart(cId,pId)
    res.send({ status: "success", payload: addToCart })
})

dbCartsRouter.delete('/:cId/products/:pId', async(req,res)=>{
    const { cId, pId } = req.params;   
    const deleteOne = await DBCartsController.deleteProductFromCart(cId,pId)
    res.send({status:"success", payload:deleteOne})
})

dbCartsRouter.put('/:cId', async(req,res)=>{
    const { cId } = req.params;
    const products = req.body;   
    const newProds = await DBCartsController.updateAllCartProducts(cId)
    res.send({status:"success", payload:newProds})
})

dbCartsRouter.put('/:cId/products/:pId', async(req,res)=>{
    const { cId, pId } = req.params;
    const newQtty = parseInt(req.body.quantity);
    const modQtty = await DBCartsController.updateProductQuantity(cId, pId, newQtty)
    res.send({status:"success", payload:modQtty})
})

dbCartsRouter.delete('/:cId', async(req,res)=>{
    const { cId } = req.params;   
    const deleteProds = await DBCartsController.emptyCart(cId)
    res.send({status:"success", payload:deleteProds})
})


export default dbCartsRouter;