/**
 * Handles user login by sending a POST request to the server.
 * @param {Event} e - The form submission event.
 * @returns {Promise<void>}
 */
export const login = async (e) => {
    e.preventDefault();

    //* Get username and password from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //* Validate input fields
    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    try {
        //* Send login request to the server
        const response = await fetch('http://localhost:1234/auth/login', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        //* Check if the request was successful
        if (!response.ok) {
            throw new Error('Login failed. Please check your credentials.');
        }

        //* Reload the page on successful login
        location.reload();
    } catch (error) {
        console.error('Error during login:', error);
        alert(error.message); // Show error message to the user
    }
};