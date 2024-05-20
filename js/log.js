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

//Funcion para validar los datos del formulario de registro
document.querySelector('.submit').addEventListener('click', function(event) {
  let username = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let mail = document.getElementById('mail').value;
  let password = document.getElementById('password').value;

  localStorage.setItem('firstname', username);
  localStorage.setItem('lastname',lastname);
  localStorage.setItem('mail', mail);
  localStorage.setItem('password', password);

  if (username === undefined && lastname === undefined && mail === undefined && password === undefined) {
    console.log("Es undefined")
    alert('You must compete each field');
  } else {
    //window.location.href = '../html/ordernow.html';
    console.log("No es undefined")
  }
  

  //Funcion para validar si el usuario esta registrado y puede logearse
  document.querySelector('.submitlogin').addEventListener('click', function(event) { 
    let usernameIsRegister = document.getElementById('userEmail').value;
    let passwordIsRegister = document.getElementById('userPassword').value

    if (username === usernameIsRegister && password === passwordIsRegister) {
      localStorage.setItem('userEmail', usernameIsRegister);
      localStorage.setItem('userPassword', passwordIsRegister);

      window.location.href = '../html/ordernow.html';

    } else {
      alert('Incorrect username or password');
    }
    
  });

});


 if (username !== undefined && lastname !== undefined && mail !== undefined && password !== undefined) {
    window.location.href = '../html/ordernow.html';
  } else {
    alert('You must compete each field');
  }

