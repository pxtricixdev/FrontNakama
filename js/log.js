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
}

function register() {
  x.style.left = "-510px";
  y.style.right = "5px";
  a.className = "btn";
  b.className += " white-btn";
  x.style.opacity = 0;
  y.style.opacity = 1;
}


//Url del endpoint para registrar clientes
const urlClientRegister = 'http://localhost:8080/Nakama/Controller?ACTION=CLIENTES.REGISTER';

document.getElementById('register').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const username = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('mail').value;
  const password = document.getElementById('password').value;

  //Si no se ha rellenado algun campo salta una alerta
  if (!username || !lastname || !email || !password) {
    alert('You must complete each field');
  }
  //Creamos el objeto del cliente
  const client = {
    _nombre: username,  
    _apellido: lastname,
    _email: email,
    _password: password,
  };
  console.log(client);

  try {
    //Solicitud fetch para añadir el cliente
    fetch(urlClientRegister, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "no-cors",
      body: JSON.stringify(client)
    })

    console.log('Registro completado con exito')

    alert('Your account has been successfully registered. Please log in to make an order.');
    window.location.href = '../html/log.html';

  } catch (error) {
    //Si no se ha podido realizar la solicitud mostrarmos el error
    console.error('Error al realizar la solicitud:', error);
  }
});

//Funcion 
document.getElementById('login').addEventListener('submit', async function(event) {
  event.preventDefault(); 

  const email = document.getElementById('userEmail').value;
  const password = document.getElementById('userPassword').value;

  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  localStorage.setItem('isLogged', 'true'); 

  const urlClientLogin = `http://localhost:8080/Nakama/Controller?ACTION=CLIENTES.LOGIN&CL_EMAIL=${email}&CL_PASSWORD=${password}`;

  try {
    const response = await fetch(urlClientLogin);

    if (response.ok) {
      const data = await response.json();

      if (data.message) {
        alert('Incorrect username or password');
      } else {
        console.log('Log is successful');
        window.location.href = '../html/ordernow.html';
      }
    } else {
      alert('Incorrect username or password');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
});



/*
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
*/
