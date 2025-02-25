// login
export const login = async (e) =>{
    e.preventDefault();
    fetch('http://localhost:1234/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: await document.getElementById('username').value,
            password: await document.getElementById('password').value
        })
    }).then(() => location.reload())
}