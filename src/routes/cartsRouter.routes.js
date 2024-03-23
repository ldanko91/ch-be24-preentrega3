import { Router } from "express";
import { passportCall } from "../utils/jwt/jwtPassportCall.js";
import Auth from "../utils/middlewares/loginAuth/Auth.js";
import dbCartsController from "../controllers/carts.controller.js";
import dbTicketsController from "../controllers/tickets.controller.js";
import PurchaserEmail from "../utils/middlewares/purchaserEmail/PurchaserEmail.js";
const DBCartsController = new dbCartsController();
const DBTicketsController = new dbTicketsController();
const cartsRouter = Router();

cartsRouter.get('/', passportCall('jwt'), Auth('admin'), async (req, res) => {
    let carritos = await DBCartsController.getAll();
    res.render('carts', {
        carritos,
        title: `Listado de carritos`
    })
})

cartsRouter.get('/current', passportCall('jwt'), Auth('user'), async (req, res) => {
    let ccod = req.user.user.cartCode
    let download = await DBCartsController.getById(ccod);
    let products = download.products;
    res.render('cartDetail', {
        ccod, products,
        title: `Productos en carrito código: ${ccod}`
    })
})

cartsRouter.post('/', async (req, res) => {
    const newCart = req.body
    const upload = await DBCartsController.createOne(newCart);
    res.send({ status: "success", payload: upload })
})

cartsRouter.put('/:cId/products/:pId', async (req, res) => {
    const { cId, pId } = req.params;
    const addToCart = await DBCartsController.addProductToCart(cId, pId)
    res.send({ status: "success", payload: addToCart })
})

cartsRouter.patch('/:cId/product/:pId', async (req, res) => {
    const { cId, pId } = req.params;
    const deleteOne = await DBCartsController.deleteProductFromCart(cId, pId)
    res.send({ status: "success", payload: deleteOne })
})
cartsRouter.patch('/:cId', async (req, res) => {
    const { cId } = req.params;
    const deleteProds = await DBCartsController.emptyCart(cId)
    res.send({ status: "success", payload: deleteProds })
})

cartsRouter.put('/:cId', async (req, res) => {
    const { cId } = req.params;
    const products = req.body;
    const newProds = await DBCartsController.updateAllCartProducts(cId)
    res.send({ status: "success", payload: newProds })
})

cartsRouter.put('/:cId/products/:pId', async (req, res) => {
    const { cId, pId } = req.params;
    const newQtty = parseInt(req.body.quantity);
    const modQtty = await DBCartsController.updateProductQuantity(cId, pId, newQtty)
    res.send({ status: "success", payload: modQtty })
})


cartsRouter.post('/:cId/purchase', passportCall('jwt'), Auth('user'), async (req, res) => {
    const { cId } = req.params;
    const cart = await DBCartsController.getById(cId);
    const products = cart.products
    const email = await PurchaserEmail(req.user.user.id)
    const newTicketData = { email: email, products: products }
    const orderProcess = await DBTicketsController.createOne(newTicketData, cId)
    res.send({ status: "success", payload: orderProcess })
})

export default cartsRouter;