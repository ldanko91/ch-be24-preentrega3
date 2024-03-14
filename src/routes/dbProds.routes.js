import { Router } from "express";
const dbProdsRouter = Router();
import dbProductsController from "../controllers/products.controller.js";

const DBProductsController = new dbProductsController 

dbProdsRouter.get('/', async(req,res)=>{    
    let pageq = parseInt(req.query.page) || 1;
    let limitq = parseInt(req.query.limit) || 10;
    const filterByq = req.query.filterBy
    const sortByq = req.query.sortBy || "price";
    const sortOrderq = req.query.sortOrder || "asc";
    const { docs, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = await DBProductsController.getAll(pageq, limitq, filterByq, sortByq, sortOrderq);
    const productos = docs
    res.render('products', {
        productos, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage,
        title: "Listado de productos"
    })
})

dbProdsRouter.get('/:pcod', async(req,res)=>{
    let {pcod} = req.params
    let productos = await DBProductsController.getProductByCode(pcod);
    res.render('productDetail', {
        productos,
        title: `${productos[0].title} código ${pcod}`
    })
})

dbProdsRouter.post('/', async(req,res)=>{
    let {code, title, description, price, thumbnail, stock, category} = req.body;
    let newProd = {code, title, description, price, thumbnail, stock, category};
    let upload = await DBProductsController.createOne(newProd);
    res.send({status:"success", payload:upload})
})

dbProdsRouter.put('/:pid', async(req,res)=>{
    let {title, description, price, thumbnail, stock, category} = req.body;
    let updProd = {title, description, price, thumbnail, stock, category};
    let {pid} = req.params
    let update = await DBProductsController.updateProductById(pid,updProd);
    res.send({status:"success", payload:update})
})

dbProdsRouter.delete('/:pid', async(req,res)=>{
    let {pid} = req.params
    let delProd = await DBProductsController.deleteProductById(pid);
    res.send({status:"success", payload:delProd})
})

export default dbProdsRouter;