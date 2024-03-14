const registerForm = document.getElementById('registerForm')

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(registerForm)
    const obj = {}

    data.forEach((value, key) => (obj[key] = value))

    const URL = '/api/sessions/register';
    const headers = {
        'Content-type': 'application/json',
    };
    const method = 'POST';
    const body = JSON.stringify(obj);

    // console.log(JSON.parse(body))
    fetch(URL, {
        headers:headers,
        method: method,
        body: body,
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
})