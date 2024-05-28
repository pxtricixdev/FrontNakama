document.getElementById('job-application-form').addEventListener('reset', function(event) {
    event.preventDefault(); // Evita el envío real del formulario
    Swal.fire({
        title: 'Successfully Sent',
        text: 'We will get back to you shortly',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});