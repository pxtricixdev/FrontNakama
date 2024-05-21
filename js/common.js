//Cambia el texto del boton de login segun estas logueado o no
const loginBtn = document.getElementById('loginBtn');

function updateLoginButton() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    //Si estas logueado cambia a log out para poder salir
    if (isLoggedIn === 'true') {
        loginBtn.textContent = 'Log Out';
    } else { //Si no estas logueado esta en Log In
        loginBtn.textContent = 'Log In';
    }
}

// Funcion para desloguearse
loginBtn.addEventListener('click', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    //Si el usuario hace click en log out desloguea al usuario, actualiza el boton y redirige a la pagina de home
    if (isLoggedIn === 'true') {
        localStorage.setItem('isLoggedIn', 'false');
        updateLoginButton();
        window.location.href = 'home.html';
    } else {
        // Si hace click en log in entonces te lleva a la pagina de log in
        window.location.href = 'log.html';
    }
});

// Llama a la funcion de actualizar el boton de login
updateLoginButton();