console.log("se activo el productos.js")
const btnAdd = Object(document.getElementById('addBtn'))

const addToCart = async (productId, cartCode) => {
    console.log('prod' + productId)
    console.log('cart' + cartCode)
    await fetch(`/api/carts/${cartCode}/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: '',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error al agregar al carrito:', error);
        });
}


// btnAdd.addEventListener('click', console.log("boton cliqueado"))