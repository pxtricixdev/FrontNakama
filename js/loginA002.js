//Funcion para mostrar los paneles
function showTable(table) {
    let allTables = document.querySelectorAll('.tabla');
    let allTitles = document.querySelectorAll('.titulo')
    allTitles.forEach(t => t.style.display = 'none');
    allTables.forEach(t => t.style.display = 'none'); 

    if (table === 'staff') {
        document.getElementById('tablaStaff').style.display = 'table';
        document.getElementById('titleStaff').style.display = 'flex';
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

// Verifica si el usuario esta autenticado o si no tiene el rol de staff
if (localStorage.getItem('isAuthenticated') !== 'true' || localStorage.getItem('role') !== 'staff') {
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