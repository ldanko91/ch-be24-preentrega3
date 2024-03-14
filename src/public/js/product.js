console.log("se activo el productos.js")
const btnAdd = Object(document.getElementById('addBtn'))

const addToCart = async (productId) => {
    console.log(productId);
    await fetch(`/api/carts/65bac62505eef1138a2708f5/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
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