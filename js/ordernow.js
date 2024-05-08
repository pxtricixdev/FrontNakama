/*---- popup carrito -----*/

document.addEventListener('DOMContentLoaded', function() {
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const modalMenu = document.getElementById('modal-carrito');

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

/*----- funcion carrito -----*/
// Variables
const addProducts = document.querySelectorAll('.add-cart');
const cartList = document.getElementById('elementos');
const totalDisplay = document.getElementById('total');
const restProduct = document.getElementById('less')
const addProduct = document.getElementById('plus')
let numberProduct = document.getElementById('cant')
let total = 0;

addProducts.forEach(product => {
    product.addEventListener('click', addToCart);
});

// Añadir al carrito
function addToCart(event) {
    const button = event.target;
    const item = button.parentElement.parentElement.parentElement;
    const itemName = item.querySelector('h2').innerText;
    const itemPrice = parseFloat(item.querySelector('.price').innerText.replace('$', ''));

    const cartItem = document.createElement('p');
    cartItem.innerText = `${itemName} - ${itemPrice.toFixed(2)}$`;
    cartList.appendChild(cartItem);
    

    total += itemPrice;
    totalDisplay.innerText = `${total.toFixed(2)}`;
}

const clearButton = document.getElementById('btn-vaciar');
clearButton.addEventListener('click', clearCart);

// Vaciar carrito
function clearCart() {
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
    total = 0;
    totalDisplay.innerText = `$${total.toFixed(2)}`;
}

