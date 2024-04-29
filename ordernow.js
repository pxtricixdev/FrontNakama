
// Funcion para abrir el carrito y que se muevan los productos a la izquierda
function toggleCarrito() {
    let carrito = document.querySelector('.carrito')
    carrito.classList.toggle('mostrar-carrito')

    let brgSect = document.querySelector('.brg-sect')
    brgSect.classList.toggle('mover-productos')

    let startSect = document.querySelector('.starters-sect')
    startSect.classList.toggle('mover-productos')

    let milkshakesSect = document.querySelector('.milkshakes-sect')
    milkshakesSect.classList.toggle('mover-productos')

    let dessertsSect = document.querySelector('.desserts-sect')
    dessertsSect.classList.toggle('mover-productos')

    if (carrito.classList.contains('mostrar-carrito')) {
        const cartList = document.getElementById('elementos');
        if (cartList.children.length > 0) {
            carrito.classList.add('mostrar-carrito');
        }
    }
}

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

    const cartItem = document.createElement('li');
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