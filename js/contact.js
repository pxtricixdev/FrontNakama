document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    Swal.fire({
        title: 'Sucessfully Sent',
        text: 'Thak you for your feedback',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'popup-class',
            title: 'title-class',
            content: 'content-class',
            confirmButton: 'confirm-button-class'
        }

    }).then((result) => {
        if (result.isConfirmed) {
            event.target.reset(); 
        }
    });
});