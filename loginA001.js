function showTable(table) {
    let allTables = document.querySelectorAll('.tabla');
    let allTitles = document.querySelectorAll('.titulo')
    allTitles.forEach(t => t.style.display = 'none');
    allTables.forEach(t => t.style.display = 'none'); 

    if (table === 'staff') {
        document.getElementById('tablaStaff').style.display = 'table';
        document.getElementById('titleStaff').style.display = 'flex';
    } else if (table === 'productos') {
        document.getElementById('tablaProductos').style.display = 'table';
        document.getElementById('titleProductos').style.display = 'flex'
    } else if (table === 'empleados') {
        document.getElementById('tablaEmpleados').style.display = 'table';
        document.getElementById('titleEmpleados').style.display = 'flex'
    } else if (table === 'pedidos') {
        document.getElementById('tablaPedidos').style.display = 'table';
        document.getElementById('titlePedidos').style.display = 'flex'
    } else if (table === 'convenio') {
        document.getElementById('tablaConvenio').style.display = 'table';
        document.getElementById('titleConvenio').style.display = 'flex'
    } else if (table === 'ora') {
        document.getElementById('tablaOra').style.display = 'table';
        document.getElementById('titleOra').style.display = 'flex'
    }
    
}

