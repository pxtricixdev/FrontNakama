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

    // Busca si el producto ya esta en el carrito
    let existingCartItem = null;
    const cartItems = cartList.getElementsByClassName('cart-item');
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].querySelector('.cart-item-name').innerText === itemName) {
            existingCartItem = cartItems[i];
            break;
        }
    }

    // Si el producto ya existe le suma 1
    if (existingCartItem) {
        const quantityElement = existingCartItem.querySelector('.quantity');
        const currentQuantity = parseInt(quantityElement.innerText);
        quantityElement.innerText = currentQuantity + 1;
    } else { //Si no existe crea uno nuevo
        const cartItem = document.createElement('p');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
        <span class="cart-item-name">${itemName}</span> - 
            <span class="cart-item-price">$${itemPrice.toFixed(2)}</span>  
            <div class="cantidad">
                <button class="less-btn" style="background-color: #000; border-radius: 15px; padding: 5px 10px; color: #fff">-</button>
                <span class="quantity" style="color:#fff">1</span>
                <button class="add-btn" style="background-color: #000; border-radius: 15px; padding: 5px 8px; color: #fff">+</button>
                <img class="remove-btn" src="../imgOrderNow/icons8-trash-white-256.png" style="width: 20px;margin-left:10px; cursor:pointer" alt="Delete">
            </div>`;
        cartList.appendChild(cartItem);

        // Funcion para eliminar un producto del carrito
        const removeButton = cartItem.querySelector('.remove-btn');
        removeButton.addEventListener('click', function() {
            cartList.removeChild(cartItem); 
            total -= itemPrice; 
            totalDisplay.innerText = `${total.toFixed(2)}`; 
        });
    }

    // Se actualiza el precio del producto
    total += itemPrice;
    totalDisplay.innerText = `${total.toFixed(2)}`;
}

// Funcion de agregar y restar dentro del carrito
cartList.addEventListener('click', function(event) {
    const button = event.target;
    if (button.classList.contains('add-btn')) {
        const quantityElement = button.parentElement.querySelector('.quantity');
        const currentQuantity = parseInt(quantityElement.innerText);
        quantityElement.innerText = currentQuantity + 1;
        updateTotal();
    } else if (button.classList.contains('less-btn')) {
        const quantityElement = button.parentElement.querySelector('.quantity');
        const currentQuantity = parseInt(quantityElement.innerText);
        if (currentQuantity > 1) {
            quantityElement.innerText = currentQuantity - 1;
            updateTotal();
        }
    }
});

// Funcion para actualizar el total del carrito despues de agregar productos del mismo tipo
function updateTotal() {
    total = 0;
    const cartItems = cartList.getElementsByClassName('cart-item');
    for (let i = 0; i < cartItems.length; i++) {
        const price = parseFloat(cartItems[i].querySelector('.cart-item-price').innerText.replace('$', ''));
        const quantity = parseInt(cartItems[i].querySelector('.quantity').innerText);
        total += price * quantity;
    }
    totalDisplay.innerText = `${total.toFixed(2)}`;
}

// Vaciar carrito
const clearButton = document.getElementById('btn-vaciar');
clearButton.addEventListener('click', clearCart);


function clearCart() {
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
    total = 0;
    totalDisplay.innerText = `$${total.toFixed(2)}`;
}
