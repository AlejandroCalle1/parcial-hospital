document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-card');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {// Agrega un evento de escucha al formulario de inicio de sesión que se activa cuando se envía el formulario
      e.preventDefault(); // Detiene el envío predeterminado

      const email = document.getElementById('email').value.trim();// Obtiene el valor del campo de correo electrónico y elimina espacios en blanco al inicio y al final
      const pass = document.getElementById('password').value.trim();// Obtiene el valor del campo de contraseña y elimina espacios en blanco al inicio y al final

      if (email === '' || pass === '') {   // Verifica si los campos están vacíos
        alert('Por favor, ingresa tu correo y contraseña.');
      } else {
        localStorage.setItem('usuarioActivo', email);
        alert(`¡Bienvenido/a a Chronos Travel, ${email}!`);
        window.location.href = "index.html"; // Redirige al inicio
      }
    });
  }
});