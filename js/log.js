//Funcion para elegir si un usuario quiere Logearse o Registrarse
function myMenuFunction() {
  const i = document.getElementById("navMenu");
  if (i.className === "nav-menu") {
    i.className += " responsive";
  } else {
    i.className = "nav-menu";
  }
}
const a = document.getElementById("loginBtn");
const b = document.getElementById("registerBtn");
const x = document.getElementById("login");
const y = document.getElementById("register");
function login() {
  x.style.left = "4px";
  y.style.right = "-520px";
  a.className += " white-btn";
  b.className = "btn";
  x.style.opacity = 1;
  y.style.opacity = 0;

  var email =  document.getElementById("userEmail");

  sendUserData();
}

function register() {
  x.style.left = "-510px";
  y.style.right = "5px";
  a.className = "btn";
  b.className += " white-btn";
  x.style.opacity = 0;
  y.style.opacity = 1;
}

//Funcion de registro
document.querySelector('.submit').addEventListener('click', function(event) {
  event.preventDefault();

  let username = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let mail = document.getElementById('mail').value;
  let password = document.getElementById('password').value;

  //Si no se ha rellenado algun campo salta una alerta
  if (!username || !lastname || !mail || !password) {
    alert('You must complete each field');
    return;
  }

  //Guardamos los datos de registro
  localStorage.setItem('firstname', username);
  localStorage.setItem('lastname', lastname);
  localStorage.setItem('mail', mail);
  localStorage.setItem('password', password);

  //Redirige a la pagina de realizar pedido
  window.location.href = '../html/ordernow.html';
});

//Funcion para comprobar si el usuario ya esta registrado y puede loguearse
document.querySelector('.submitlogin').addEventListener('click', function(event) {
  event.preventDefault();

  let usernameIsRegister = document.getElementById('userEmail').value;
  let passwordIsRegister = document.getElementById('userPassword').value;

  let storedUsername = localStorage.getItem('mail');
  let storedPassword = localStorage.getItem('password');

  //Verifica si el usuario ya esta registrado
  if (usernameIsRegister === storedUsername && passwordIsRegister === storedPassword) {
    localStorage.setItem('userEmail', usernameIsRegister);
    localStorage.setItem('userPassword', passwordIsRegister);
    localStorage.setItem('isLoggedIn', 'true');

    //Redirige a la pagina de realizar pedido
    window.location.href = '../html/ordernow.html';
  } else {
    //Si el usuario o la contraseña es incorrecto o el usuario no esta registrado
    alert('Incorrect username or password');
  }
});

