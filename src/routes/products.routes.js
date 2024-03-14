import { Router } from "express";
import ProductManager from "../dao/fileManagers/ProductManager.js";

const prodsRouter = Router();
const manager1 = new ProductManager()

prodsRouter.get('/', async (req,res)=>{
    let {limit} = req.query
    
    if (limit){
        const productos = await manager1.getProducts();
        const limitProds = productos.slice(0,(limit))
        // res.send(limitProds)
        
        res.render('home',{
            limitProds,
            title: "Listado de productos"
        })
    }else{
    const productos = await manager1.getProducts();
    // res.send(productos)
    res.render('home',{
        productos,
        title: "Listado de productos"
    })
    }
})

// prodsRouter.get('/:pid', async (req,res)=>{
//     const pId = parseInt(req.params.pid)
//     const producto = await manager1.getProductById(pId);
//     res.send(producto)
// })

prodsRouter.post('/', async(req,res)=>{
    let newProd = await req.body;
    let cargaNewProd = manager1.addProduct(newProd);
    console.log("Este" + newProd) 
    res.send('El nuevo producto fue cargado correctamente')
})

prodsRouter.put('/:pid', async (req,res)=>{
    const pId = parseInt(req.params.pid)
    const updData = await req.body;
    const updProducto = await manager1.updateProductById(pId,updData);
    res.send(`El producto con ID: ${pId} fue actualizado correctamente`)
})

prodsRouter.delete('/:pid', async (req,res)=>{
    const pId = parseInt(req.params.pid)
    const producto = await manager1.deleteProductById(pId);
    res.send('El producto con ID: '+pId+' fue eliminado')
})

export default prodsRouter;