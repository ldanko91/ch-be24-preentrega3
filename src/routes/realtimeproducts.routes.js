import { Router } from "express";
import ProductManager from "../dao/fileManagers/ProductManager.js";

const rtpRouter = Router();
const manager1 = new ProductManager();

rtpRouter.get('/', async (req,res)=>{
    let {limit} = req.query
    
    if (limit){
        const productos = await manager1.getProducts();
        const limitProds = productos.slice(0,(limit))
        // res.send(limitProds)
        
        res.render('realtimeproducts',{
            limitProds,
            title: "Real time products"
        })
    }else{
    const productos = await manager1.getProducts();
    // res.send(productos)
    res.render('realtimeproducts',{
        productos,
        title: "Real time products"
    })
    }
})

export default rtpRouter