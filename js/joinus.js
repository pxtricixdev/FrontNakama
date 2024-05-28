document.getElementById('job-application-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    Swal.fire({
        title: 'Successfully Sent',
        text: 'We will get back to you shortly',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            event.target.reset(); 
        }
    });
});