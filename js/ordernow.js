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
        <span class="cart-item-name" style="font-size:18px">${itemName}</span> - 
            <span class="cart-item-price" style="font-size:18px">$${itemPrice.toFixed(2)}</span>  
            <div class="cantidad" style="display: flex; align-items: center; gap: 5px; margin-top: 5px">
                <button class="less-btn" style="background-color: #000; border-radius: 15px; padding: 5px 10px; color: #fff">-</button>
                <span class="quantity" style="color:#fff">1</span>
                <button class="add-btn" style="background-color: #000; border-radius: 15px; padding: 5px 8px; color: #fff">+</button>
                <img class="remove-btn" src="../imgOrderNow/icons8-trash-white-256.png" style="width: 20px;margin-left:10px; cursor:pointer" alt="Delete">
            </div>`;
        cartList.appendChild(cartItem);
        alert(itemName + ' added to cart.')

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

// Fetch para coger los productos y las categorias de la BBDD
const urlProducts = 'http://localhost:8080/Nakama/Controller?ACTION=PRODUCTOS.FIND_ALL';
const urlCategory = 'http://localhost:8080/Nakama/Controller?ACTION=CATEGORIA.FIND_ALL';

const fetchCategories = async () => {
    try {
        const result = await fetch(urlCategory);
        const data = await result.json();
        console.log('Categorías obtenidas de la API:', data);
        printCategories(data);
        //await fetchProducts(); // Hace fetch de los productos despues de que se hayan impreso las categorias
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

const fetchProducts = async () => {
    try {
        const result = await fetch(urlProducts);
        const data = await result.json();
        console.log('Productos obtenidos de la API:', data);
        printProducts(data);
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

//Funcion imprimir categorias
const printCategories = (categories) => {
    const listCategories = document.getElementById('categories');
    //Array de categorias
    categories.forEach(category => {
        const { _idCategoria, 
            _nombre } = category;

        //crea un div para cada categoria con la clase category-container y el id category- +idCategoria
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        categoryContainer.id = `category-${_idCategoria}`;

        //agrega un titulo h2 con el nombre de la categoria
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = _nombre;

        categoryContainer.appendChild(categoryTitle);

        //crea un div que contiene los productos de cada categoria
        const productsGrid = document.createElement('div');
        productsGrid.classList.add('products-grid');
        categoryContainer.appendChild(productsGrid);

        listCategories.appendChild(categoryContainer);
    });
};

//Funcion imprimir productos
const printProducts = (products) => {
    //Array de los productos
    products.forEach(product => {
        const {
            _idProducto,
            _nombre,
            _descripcion,
            _precioVenta,
            _imagenRuta,
            _idCategoria,
        } = product;

        // Busca el elemento que tiene esa categoria
        const categoryContainer = document.getElementById(`category-${_idCategoria}`);

        if (categoryContainer) {
            //Si coincide se añaden las cards de los productos
            const productsGrid = categoryContainer.querySelector('.products-grid');
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <div class="burger1">
                    <div class="burger-right">
                        <img class="img-teriyaki" src="${_imagenRuta}" alt="">
                    </div>
                    <div class="burger-left">
                        <h2 class="nombre">${_nombre}</h2>
                        <p class="burger-description">${_descripcion}</p>
                        <p class="price" marcador="1">$${_precioVenta}
                            <button class="add-cart" id="add-cart-${_idProducto}">
                                <img src="../imgOrderNow/add-circle-svgrepo-com.png" alt="">
                            </button>
                        </p>
                    </div>
                </div>
            `;

            productsGrid.appendChild(card);

            //Busca el boton de agregar al carrito dentro del card y llama a la funcion addToCart
            const addButton = card.querySelector('.add-cart');
            addButton.addEventListener('click', addToCart);
        } 
    });
};

//fetchCategories();

async function fetchCategoriesAndProducts() {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(urlProducts),
      fetch(urlCategory)
    ]);
  
    const products = await productsResponse.json();
    const categories = await categoriesResponse.json();
  
    printCategories(categories);
    printProducts(products);
    
  }

  fetchCategoriesAndProducts();