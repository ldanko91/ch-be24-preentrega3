const uploadForm = document.getElementById('uploadProductForm')
const modifyForm = document.getElementById('modifyProductForm')
const deleteForm = document.getElementById('deleteProductForm')

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(uploadForm)
    const obj = {}

    data.forEach((value, key) => (obj[key] = value))

    console.table(obj)

    fetch('/api/products', {
        headers: {
            'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(obj),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
})

modifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(modifyForm)
    const obj = {}

    data.forEach((value, key) => (obj[key] = value))

    const code = obj.code
    console.log(data)
    console.table(obj)
    console.log(code)

    fetch(`/api/products/${code}`, {
        headers: {
            'Content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(obj),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(deleteForm)
    const obj = {}

    data.forEach((value, key) => (obj[key] = value))

    const code = obj.code
    console.log(data)
    console.table(obj)
    console.log(code)

    fetch(`/api/products/${code}`, {
        headers: {
            'Content-type': 'application/json',
        },
        method: 'DELETE',
        body: JSON.stringify(obj),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
})