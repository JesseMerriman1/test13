document.addEventListener('DOMContentLoaded', function() {

    function loadAppointments() {
        fetch('http://localhost:3000/api/appointments')
            .then(response => response.json())
            .then(data => {
                console.log(data); 
            })
            .catch(error => console.error('Error:', error));
    }

    loadAppointments();

  
});
