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

//Funcion de registro de usuario
document.querySelector('.submit').addEventListener('click', function(event) {
  event.preventDefault();

  let username = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let mail = document.getElementById('mail').value;
  let password = document.getElementById('password').value;

  //Si no se ha rellenado algun campo salta una alerta
  if (!username || !lastname || !mail || !password) {
    alert('You must complete each field');
   
  } else {  //Si por el contrario se han rellenado todos los campos
    //Guardamos los datos de registro
    localStorage.setItem('firstname', username);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('mail', mail);
    localStorage.setItem('password', password);
    localStorage.setItem('isRegistered', 'true'); 

    //Redirige a la pagina de inicio de sesion
    alert('Your account has been successfully registered. Please log in to make an order.');
    window.location.href = '../html/log.html';
  }

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


//Captura de datos del registro para enviar a la tabla Clientes en BBDD
document.getElementById('register').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = localStorage.getItem('firstname');
  const lastname = localStorage.getItem('lastname');
  const email = localStorage.getItem('mail');
  const password = localStorage.getItem('password');

  const clientData = {
    CL_NOMBRE: name,
    CL_APELLIDO: lastname,
    CL_EMAIL: email,
    CL_PASSWORD: password
  };

    fetch('http://localhost:8080/Nakama/Controller?ACTION=CLIENTES.REGISTER', { // Pegar aqui la url cuando la tengamos
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientData)
  })
  .then(response => response.json())
  .then(clientData => {
      console.log('Success:', clientData);
  })
  .catch((error) => {
      console.error('Error:', error);
  });

})


