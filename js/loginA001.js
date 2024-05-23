//Funcion para mostrar los paneles
function showTable(table) {
    let allTables = document.querySelectorAll('.tabla');
    let allTitles = document.querySelectorAll('.titulo')
    let allBtnBdd = document.querySelectorAll('.botones-bbdd')

    allTitles.forEach(t => t.style.display = 'none');
    allTables.forEach(t => t.style.display = 'none');
    allBtnBdd.forEach(t => t.style.display = 'none');

    if (table === 'productos') {
        document.getElementById('tablaProductos').style.display = 'table';
        document.getElementById('titleProductos').style.display = 'flex'
        document.getElementById('btnBbddProducts').style.display = 'flex'
    } else if (table === 'empleados') {
        document.getElementById('tablaEmpleados').style.display = 'table';
        document.getElementById('titleEmpleados').style.display = 'flex'
        document.getElementById('btnBbddEmployees').style.display = 'flex'
    } else if (table === 'clientes') {
        document.getElementById('tablaClients').style.display = 'table';
        document.getElementById('titleClients').style.display = 'flex'
    } else if (table === 'pedidos') {
        document.getElementById('tablaOrders').style.display = 'table';
        document.getElementById('titleOrders').style.display = 'flex'
    } 
    
}

// Verifica si el usuario esta autenticado o si no tiene el rol de admin
if (localStorage.getItem('isAuthenticated') !== 'true' || localStorage.getItem('role') !== 'admin') {
    window.location.href = 'logAdmin.html'; // Redirige a login
}

// Cerrar sesion
document.getElementById('btn-logout').addEventListener('click', function() {
    // Removemos los datos
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('role');
    // Redirige a login
    window.location.href = 'logAdmin.html';
});


//Fetch para obtener y mostrar los productos de la BBDD
const urlProducts = 'http://localhost:8080/Nakama/Controller?ACTION=PRODUCTOS.FIND_ALL';

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

const printProducts = (products) => {
    const table = document.getElementById('tablaProductos');
    const tbody = table.querySelector('tbody');
    table.style.display = 'table';  

    products.forEach(product => {
        const {
            _idProducto,
            _nombre,
            _descripcion,
            _precioVenta,
            _estado,
            _idCategoria,
        } = product;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${_idProducto}</td>
            <td>${_nombre}</td>
            <td>${_descripcion}</td>
            <td>${_precioVenta}</td>
            <td>${_estado}</td>
            <td>${_idCategoria}</td>
        `;

        tbody.appendChild(row);
    });
};

fetchProducts();

//Popup formulario add productos
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

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
}

const addButton = document.getElementById('addBtnModal');

addButton.addEventListener('click', function() {
    closeModal(modalMenu);
});

// Constantes de los valores del formulario 
//const productIdInput = document.getElementById('productId');
const productNameInput = document.getElementById('productName');
const productDescriptionInput = document.getElementById('productDescription');
const productPriceInput = document.getElementById('productPrice');
const productImageInput = document.getElementById('productImage');
const productStateElement = document.getElementById('productState');
const productCategoryIdInput = document.getElementById('productCategoryId');

// URL del endpoint para añadir productos
const urlAddProducts = 'http://localhost:8080/Nakama/Controller?ACTION=PRODUCTOS.ADD';

document.getElementById('addBtnModal').addEventListener('click', async () => {
    // Valores de los campos del formulario
    //const productId = productIdInput.value;
    const productName = productNameInput.value;
    const productDescription = productDescriptionInput.value;
    const productPrice = productPriceInput.value;
    const productImage = productImageInput.value;
    const productState = productStateElement.value;
    const productCategoryId = productCategoryIdInput.value;

    // Imprimimos los valores para ver si los coge bien
    //console.log('ProductID:', productId);
    console.log('Name:', productName);
    console.log('Description:', productDescription);
    console.log('Price:', productPrice);
    console.log('Image URL:', productImage);
    console.log('State:', productState);
    console.log('CategoryID:', productCategoryId);

    // Creamos el objeto del producto
    const product = {
        //ID_PRODUCTO: productId,
        PRD_NOMBRE: productName,
        PRD_PRECIO_VENTA: parseFloat(productPrice),
        PRD_DESCRIPCION: productDescription,
        PRD_IMAGEN_RUTA: productImage,
        PRD_ESTADO: productState,
        ID_CATEGORIA_PRD: productCategoryId,
    };

    try {
        // Solicitud fetch para añadir el producto
        const response = await fetch(urlAddProducts, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            // Comprobamos si el producto se ha añadido
            const data = await response.json();
            console.log('Producto añadido:', data);

            // Actualizamos la pagina para ver si se ha añadido
            printProduct(data);

            // Limpiamos el formulario
            clearForm();
            closeModal(modalMenu);
        } else {
            // Si no se ha añadido el producto, mostramos el error
            console.error('Error al añadir producto:', response.statusText);
        }
    } catch (error) {
        // Si no se ha podido realizar la solicitud mostrarmos el error
        console.error('Error al realizar la solicitud:', error);
    }
});


// Añade el producto a la tabla de productos de la web
const printProduct = (product) => {
    const table = document.getElementById('tablaProductos');
    const tbody = table.querySelector('tbody');
    table.style.display = 'table';

    const {
        //ID_PRODUCTO,
        PRD_NOMBRE,
        PRD_DESCRIPCION,
        PRD_PRECIO_VENTA,
        PRD_ESTADO,
        ID_CATEGORIA_PRD,
    } = product;

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${PRD_NOMBRE}</td>
        <td>${PRD_DESCRIPCION}</td>
        <td>${PRD_PRECIO_VENTA}</td>
        <td>${PRD_ESTADO}</td>
        <td>${ID_CATEGORIA_PRD}</td>
    `;

    tbody.appendChild(row);
};

// Funcion para limpiar el formulario
const clearForm = () => {
    //document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productState').selectedIndex = 0;
    document.getElementById('productCategoryId').value = '';
};


//Fetch de pedidos
const urlOrders = 'http://localhost:8080/Nakama/Controller?ACTION=PEDIDOS.FIND_ALL';

const fetchOrders = async () => {
    try {
        const result = await fetch(urlOrders);
        const data = await result.json();
        console.log('Pedidos obtenidos de la API:', data);
        printOrders(data);
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

const printOrders = (orders) => {
    const table = document.getElementById('tablaOrders');
    const tbody = table.querySelector('tbody');
    table.style.display = 'table';  

    orders.forEach(order => {
        const {
            _idPedido,
            _hora,
            _fecha,
            _tlf,
            _direccion,
            _estado,
            _precio,
            _idCliente,
            _idEmpleado,
        } = order;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${_idPedido}</td>
            <td>${_hora}</td>
            <td>${_tlf}</td>
            <td>${_direccion}</td>
            <td>${_estado}</td>
            <td>${_precio}</td>
            <td>${_idCliente}</td>
            <td>${_idEmpleado}</td>
        `;

        tbody.appendChild(row);
    });
};

fetchOrders();

//Fetch de clientes de la BBDD
const urlClients = 'http://localhost:8080/Nakama/Controller?ACTION=CLIENTES.FIND';

const fetchClients = async () => {
    try {
        const result = await fetch(urlClients);
        const data = await result.json();
        console.log('Clientes obtenidos de la API:', data);
        printClients(data);
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

const printClients = (clients) => {
    const table = document.getElementById('tablaClients');
    const tbody = table.querySelector('tbody');
    table.style.display = 'table';  

    clients.forEach(client => {
        const {
            _idCliente,
            _nombre,
            _apellido,
            _email,
            _password,
        } = client;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${_idCliente}</td>
            <td>${_nombre}</td>
            <td>${_apellido}</td>
            <td>${_email}</td>
            <td>${_password}</td>
        `;

        tbody.appendChild(row);
    });
};

fetchClients();

//Fetch de empleados de la BBDD
const urlEmployees = 'http://localhost:8080/Nakama/Controller?ACTION=EMPLEADOS.FIND_ALL';

const fetchEmployees = async () => {
    try {
        const result = await fetch(urlEmployees);
        const data = await result.json();
        console.log('Empleados obtenidos de la API:', data);
        printEmployees(data);
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

const printEmployees = (employees) => {
    const table = document.getElementById('tablaEmpleados');
    const tbody = table.querySelector('tbody');
    table.style.display = 'table';  

    employees.forEach(employee => {
        const {
            _idEmpleado,
            _nombre,
            _apellido,
            _email,
            _telefono,
            _fechaContrato,
            _salario,
            _estado,
            _idPuesto,
            _idUsuario,
        } = employee;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${_idEmpleado}</td>
            <td>${_nombre}</td>
            <td>${_apellido}</td>
            <td>${_email}</td>
            <td>${_telefono}</td>
            <td>${_fechaContrato}</td>
            <td>${_salario}</td>
            <td>${_estado}</td>
            <td>${_idPuesto}</td>
            <td>${_idUsuario}</td>
        `;

        tbody.appendChild(row);
    });
};

fetchEmployees();


