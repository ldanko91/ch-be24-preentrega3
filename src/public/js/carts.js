console.log("se activo el carts.js")
const goPurchase = async (cCod) => {

    await fetch(`/api/carts/${cCod}/purchase`, {
        method: 'POST',
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
            console.error('Error al vaciar carrito:', error);
        });
}


const delFromCart = async (productId, cartCode) => {
    await fetch(`/api/carts/${cartCode}/product/${productId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartCode, productId }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error al borrar del carrito:', error);
        });
}

const emptyCart = async (cId) => {

    await fetch(`/api/carts/${cId}`, {
        method: 'PATCH',
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
            console.error('Error al vaciar carrito:', error);
        });
}
