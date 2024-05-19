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
    } else if (table === 'pedidos') {
        document.getElementById('tablaPedidos').style.display = 'table';
        document.getElementById('titlePedidos').style.display = 'flex'
    } 
    
}

//Fetch de los productos
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