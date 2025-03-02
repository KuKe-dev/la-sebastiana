import { login } from "../../services/auth";

export function Login() {

    // Check if user is logged
    fetch('http://localhost:1234/auth/isLogged', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: document.cookie
        })
    }).then(res => res.json()).then(data => {if (data) window.location.href = "/admin"})

return (
    <>
        <h1>Login</h1>
        
        <form onSubmit={login} method="POST" id="login-form">
            <input type='text' id="username" placeholder='Username'></input>
            <input type='password' id="password" placeholder='Password'></input>
            <button type="submit">Login</button>
        </form>
    </>
)}