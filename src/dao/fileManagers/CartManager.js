import fs from 'fs'

class CartManager {
    constructor (productos) {
        this.productos = []
        this.path = './models/carts.txt'
    }


    addCart = ({productos}) => {
        console.log(productos)
        let contenido = fs.readFileSync(this.path,'utf-8')
        let Carritos = JSON.parse(contenido)
            
        let id
        let idAuto = () => {
            let maxId = Carritos.length
            id = (maxId + 1)
            return id
        }
        
        id = idAuto()
        let newCart = {
            id: id,
            productos: productos
        }
        return (
            Carritos.push(newCart),
            fs.writeFileSync(this.path, JSON.stringify(Carritos)),
            console.log(`Carrito con id ${id} añadido correctamente`)
        )
        }
    
    
    getCarts = () => {
        let contenido =  fs.readFileSync(this.path,'utf-8')
        let Carritos =  JSON.parse(contenido)
        
        return(Carritos)
    }

    getCartById = (cartId) => {
        let contenido = fs.readFileSync(this.path,'utf-8')
        let Carritos = JSON.parse(contenido)
        
        if(!Carritos.some(carrito => carrito.id === cartId )){
            console.log("El carrito buscado no existe!")
        }else{

        let cartIndex = Carritos.findIndex(carrito => carrito.id === cartId)
        return (Carritos[cartIndex])
        }
    }

    updateCartProductById = (data) => {
        let contenido = fs.readFileSync(this.path,'utf-8')
        let Carritos = JSON.parse(contenido)
        
        if(!Carritos.some(carrito => carrito.id === data.cartId )){
            console.log("El carrito buscado no existe!")
        }else{

        let cartIndex = Carritos.findIndex(carrito => carrito.id === data.cartId)
        let carritoSelec = Carritos[cartIndex]
        console.log(carritoSelec)
        let prodsCarrSelec = carritoSelec.productos
        console.log(prodsCarrSelec)

        if(!prodsCarrSelec.some(producto => producto.id == data.prodId)){
            console.log("Producto no existente")
            let newProd = {
                id: data.prodId,
                quantity: 1
            }
            return (
                Carritos[cartIndex].productos.push(newProd),
                fs.writeFileSync(this.path, JSON.stringify(Carritos)),
                console.log(`Producto con id ${data.prodId} cargado al carrito con id ${data.cartId}`)    
            )
        }else{
            let prodIndex = carritoSelec.productos.findIndex(producto => producto.id === data.prodId)

            return (
            Carritos[cartIndex].productos[prodIndex].quantity ++,
            fs.writeFileSync(this.path, JSON.stringify(Carritos)),
            console.log(`Producto con id ${data.prodId} del carrito con id ${data.cartId} actualizado correctamente`)
            )
        }
        }
    }
    
    deleteCartById = (cartId) => {
        let contenido = fs.readFileSync(this.path,'utf-8')
        let Carritos = JSON.parse(contenido)
        
        if(!Carritos.some(carrito => carrito.id === cartId )){
            console.log("El carrito buscado no existe!")
        }else{

        let cartIndex = Carritos.findIndex(carrito => carrito.id === cartId)
        Carritos.splice(cartIndex,1)
        
        return (
            fs.writeFileSync(this.path, JSON.stringify(Carritos)),
            console.log(`El carrito con id ${cartId} fue eliminado`)
        )
        }
    }
}

export default CartManager;