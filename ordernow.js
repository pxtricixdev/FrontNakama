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
}

