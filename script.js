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