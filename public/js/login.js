document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');

  async function handleLoginFormSubmit(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
  
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
  
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });
  
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
  
      // Redirect the user to the home page
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      // Display an error message to the user
    }
  }


document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('#register-form');

  async function handleRegisterFormSubmit(event) {
    event.preventDefault();

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const { id, username: registeredUsername } = await response.json();

      // Display a success message to the user
      alert(`Successfully registered as ${registeredUsername} with ID ${id}`);

      // Clear the form fields
      document.querySelector('#username').value = '';
      document.querySelector('#email').value = '';
      document.querySelector('#password').value = '';
    } catch (error) {
      console.error(error);
      // Display an error message to the user
    }
  }

  registerForm.addEventListener('submit', handleRegisterFormSubmit);
});

loginForm.addEventListener('submit', handleLoginFormSubmit);
});