import fs from 'fs'

class ProductManager {
    constructor (title, description, price, thumbnail, code, stock, status, category) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.status = true
        this.category = category
        this.path = './models/productos.txt'
    }


    addProduct = ({title, description, price, thumbnail, code, stock, status, category}) => {
        console.log("Así llega " + title, description, price, thumbnail, code, stock, status, category)
        let contenido = fs.readFileSync(this.path,'utf-8')
        let Productos = JSON.parse(contenido)
        
        if(!title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
            console.log("Todos los campos son obligatorios!")
        }else{
            
            if(Productos.some(producto => producto.code === code )){
                console.log("El campo code ya existe!")
            }else{
            let id
            let idAuto = () => {
                let maxId = Productos.length
                id = (maxId + 1)
                return id
            }
            
            id = idAuto()
            let newProd = {
                id: id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code:code,
                stock: stock,
                status: status,
                category: category
            }
            return (
                Productos.push(newProd),
                fs.writeFileSync(this.path, JSON.stringify(Productos)),
                console.log(`Producto con id ${id} añadido correctamente`)
            )
            }
        }
        
    }
    
    getProducts = () => {
        let contenido =  fs.readFileSync(this.path,'utf-8')
        let Productos =  JSON.parse(contenido)
        
        return(Productos)
    }

    getProductByCode = (getCode) => {
        let contenido = fs.readFileSync(this.path,'utf-8')
        let Productos = JSON.parse(contenido)
        
        if (!Productos.some(producto => producto.code === getCode)) {
            console.log("El producto buscado no existe!")
        }else{

        let prodIndex = Productos.findIndex(producto => producto.id === prodId)
        return (Productos[prodIndex])
        }
    }  

    updateProductByCode = (updCode, data) => {
        let contenido = fs.readFileSync(this.path,'utf-8')
        let Productos = JSON.parse(contenido)
        
        if (!Productos.some(producto => producto.code === updCode)) {
            console.log("El producto buscado no existe!")
        }else{

        let prodIndex = Productos.findIndex(producto => producto.id === prodId)
        Productos.splice(prodIndex,1)
        
        let updatedProd = data
        updatedProd.id = prodId

        return (
            Productos.push(updatedProd),
            fs.writeFileSync(this.path, JSON.stringify(Productos)),
            console.log(`Producto con id ${prodId} actualizado correctamente`)
        )
        }
    }

    deleteProductByCode = (delCode) => {
        let contenido = fs.readFileSync(this.path,'utf-8')
        let Productos = JSON.parse(contenido)
        
        if (!Productos.some(producto => producto.code === delCode)) {
            console.log("El producto buscado no existe!")
        }else{

        let prodIndex = Productos.findIndex(producto => producto.id === prodId)
        Productos.splice(prodIndex,1)
        
        return (
            fs.writeFileSync(this.path, JSON.stringify(Productos)),
            console.log(`El producto con id ${prodId} fue eliminado`)
        )
        }
    }
}

export default ProductManager;