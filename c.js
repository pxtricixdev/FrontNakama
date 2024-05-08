function showTable(table) {
    var allTables = document.querySelectorAll('.tabla');
    allTables.forEach(t => t.style.display = 'none'); // Ocultamos todas las tablas primero

    if (table === 'usuarios') {
        document.getElementById('tablaUsuarios').style.display = 'table';
    } else if (table === 'hamburguesas') {
        document.getElementById('tablaHamburguesas').style.display = 'table';
    } else if (table === 'empleados') {
        document.getElementById('tablaEmpleados').style.display = 'table';
    }
}
