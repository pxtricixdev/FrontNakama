/*---- popup carta -----*/

document.addEventListener('DOMContentLoaded', function() {
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const modalMenu = document.getElementById('modal-menu');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            openModal(modalMenu);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(modalMenu);
        });
    });
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

/* ----- menu responsive -------*/
//Variables
const menu = document.querySelector(".menu-responsive");
const menuItems = document.querySelectorAll(".menu-item");
const hamburger= document.querySelector(".btn-hamburger");
const closeIcon= document.querySelector(".close-icon");
const menuIcon = document.querySelector(".menu-icon");

// Funcion para mostrar el menu
function toggleMenu() {
  if (menu.classList.contains("show-menu")) {
    menu.classList.remove("show-menu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
    document.body.classList.remove("menu-open");
  } else {
    menu.classList.add("show-menu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
    document.body.classList.add("menu-open");
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)

//Comprobamos si el usuario esta logueado cuando hace click en el boton Order Now para redirigir a la pagina de pedidos
const orderNowBtn = document.getElementById('orderNowBtn');

  orderNowBtn.addEventListener('click', function() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // Si se ha registrado y ha iniciado sesion redirige a la pagina de pedidos
  if (isLoggedIn === 'true') {
    window.location.href = 'ordernow.html';
     
  } else {
      //Si no lo esta redirige a inicio de sesion
    window.location.href = 'log.html';
    
  }
});


