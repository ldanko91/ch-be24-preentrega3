import { Router } from "express";
import { passportCall } from "../utils/jwt/jwtPassportCall.js";
import Auth from "../utils/middlewares/loginAuth/Auth.js";
import ProductQueryDto from "../dto/productDto/ProductQueryDto.js";
import NewProductDto from "../dto/productDto/NewProductDto.js";
import dbProductsController from "../controllers/products.controller.js";
const DBProductsController = new dbProductsController
const prodsRouter = Router();

prodsRouter.get('/', passportCall('jwt'), Auth('user'), async (req, res) => {
    const queryData = new ProductQueryDto(req.query)
    const { docs, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = await DBProductsController.getAll(queryData);
    const productos = docs
    let cartCode = req.user.user.cartCode
    res.render('products', {
        productos, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage, cartCode,
        title: "Listado de productos"
    })
})

prodsRouter.get('/backoffice', passportCall('jwt'), Auth('admin'), async (req, res) => {
    const queryData = new ProductQueryDto(req.query)
    const { docs, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = await DBProductsController.getAll(queryData);
    const productos = docs
    res.render('productsBackoffice', {
        productos, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage,
        title: "Backoffice de productos"
    })
})

prodsRouter.get('/:pcod', passportCall('jwt'), Auth('user'), async (req, res) => {
    let { pcod } = req.params
    let productos = await DBProductsController.getProductByCode(pcod);
    let cartCode = req.user.user.cartCode
    res.render('productDetail', {
        productos, cartCode,
        title: `${productos[0].title} código ${pcod}`
    })
})

prodsRouter.post('/', async (req, res) => {
    let newProd = new NewProductDto(req.body);
    let upload = await DBProductsController.createOne(newProd);
    res.send({ status: "success", payload: upload })
})

prodsRouter.put('/:pcod', async (req, res) => {
    let updProd = new NewProductDto(req.body);
    let { pcod } = req.params
    let update = await DBProductsController.updateProductById(pcod, updProd);
    res.send({ status: "success", payload: update })
})

prodsRouter.delete('/:pcod', async (req, res) => {
    let { pcod } = req.params
    let delProd = await DBProductsController.deleteProductByCod(pcod);
    res.send({ status: "success", payload: delProd })
})

export default prodsRouter;