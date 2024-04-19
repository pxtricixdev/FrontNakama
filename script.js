/*---- popup carta -----*/

document.addEventListener('DOMContentLoaded', function() {
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

