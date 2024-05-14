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


async function sendUserData() {
  const response = await fetch("http://localhost:8080/Nakama/Controller?ACTION=EMPLEADOS.FIND_ALL", {  headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",          
  }});

  const movies = await response.json();
  console.log(movies);
  alert(movies);
}