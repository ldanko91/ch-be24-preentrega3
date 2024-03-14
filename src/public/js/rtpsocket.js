const socket = io();

const showProdsDIV = document.getElementById("showProdsDIV")
const btnProds = document.getElementById("showProds")
btnProds.addEventListener('click', e =>{
    e.preventDefault();
    socket.emit('showprods', "Solicitud para ver productos")
})

socket.on('message-showprods', productos => {
    let productosShow = ""
    productos.forEach(producto =>{
        productosShow += `<li><h2>${producto.title}<h2/><br/>
                                <h3>$ ${producto.price}<h3/><br/>
                                <p>ID: ${producto.id}</p><br/>
                                <p>${producto.description}</p><br/>
                                <p>Código: ${producto.code}</p><br/>
                                <p>Stock: ${producto.stock}</p><br/>
                            <li/>`
    })
    showProdsDIV.innerHTML=productosShow
})

const formAgregarProd = document.getElementById("formAgregarProd")
const titleProd = document.getElementById("titleProd")
const descProd = document.getElementById("descProd")
const priceProd = document.getElementById("priceProd")
const thumbProd = document.getElementById("thumbProd")
const codeProd = document.getElementById("codeProd")
const stockProd = document.getElementById("stockProd")
const categProd = document.getElementById("categProd")

formAgregarProd.addEventListener('submit', e =>{
    e.preventDefault();
    let productoNuevo = {
        title: titleProd.value,
        description: descProd.value,
        price: parseInt(priceProd.value),
        thumbnail: thumbProd.value,
        code: codeProd.value,
        stock: parseInt(stockProd.value),
        status: true,
        category: categProd.value
    }
    socket.emit('agregarProd', productoNuevo)
})

const formElimProd = document.getElementById("formElimProd")
const IDElimProd = document.getElementById("IDElimProd")

formElimProd.addEventListener('submit', e =>{
    e.preventDefault();
    let IDaEliminar = parseInt(IDElimProd.value)
    socket.emit('elimProd', IDaEliminar)
})