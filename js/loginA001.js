//Funcion para mostrar los paneles
function showTable(table) {
    let allTables = document.querySelectorAll('.tabla');
    let allTitles = document.querySelectorAll('.titulo')
    allTitles.forEach(t => t.style.display = 'none');
    allTables.forEach(t => t.style.display = 'none'); 

    if (table === 'productos') {
        document.getElementById('tablaProductos').style.display = 'table';
        document.getElementById('titleProductos').style.display = 'flex'
    } else if (table === 'empleados') {
        document.getElementById('tablaEmpleados').style.display = 'table';
        document.getElementById('titleEmpleados').style.display = 'flex'
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


//Fetch de los productos de la BBDD
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
