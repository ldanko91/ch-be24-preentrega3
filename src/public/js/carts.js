console.log("se activo el carts.js")
const btnDel = Object(document.getElementById('delBtn'))


const delFromCart = async (productId) => {
    const cartId = req.params.cId
    console.log(cartId)
    console.log(productId);
    await fetch(`/api/carts/${cartId}/api/${productId}`, {
        method: 'DEL',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error al borrar del carrito:', error);
        });
}


// btnAdd.addEventListener('click', console.log("boton cliqueado"))