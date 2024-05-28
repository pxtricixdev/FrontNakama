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

  const urlClientLogin = `http://localhost:8080/Nakama/Controller?ACTION=CLIENTES.LOGIN&CL_EMAIL=${email}&CL_PASSWORD=${password}`;

  try {
    const response = await fetch(urlClientLogin);

    if (response.ok) {
      const data = await response.json();

      if (data.message) {
        alert('Incorrect username or password');
      } else {
        console.log('Log is successful');

        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', 'true'); 

        window.location.href = '../html/ordernow.html';
      }
    } else {
      alert('Incorrect username or password');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
});