// Funcion para validar el formulario del login privado
document.querySelector('.submit').addEventListener('click', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Si introduce los datos de administrador redirige a la pagina de admin
    if (username === 'A001' && password === 'admin1234') {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('isAuthenticated', 'true'); // Indicador de inicio de sesion
        localStorage.setItem('role', 'admin');
        window.location.href = '../html/loginA001.html';
    } 
    // Si introduce los datos de staff redirige a la pagina de staff
    else if (username === 'A002' && password === 'staff1234') {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('isAuthenticated', 'true'); // Indicador de inicio de sesion
        localStorage.setItem('role', 'staff');
        window.location.href = '../html/loginA002.html';
    }
    // Si introduce los datos incorrectos sale una alerta
    else {
        alert('Incorrect username or password');
    }
});
