document.addEventListener('DOMContentLoaded', function() {
    // Client management event listeners
    const addClientForm = document.getElementById('add-client-form');
    if (addClientForm) {
        addClientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addClient();
        });
    }

    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchClients();
        });
    }

    const addClientButton = document.getElementById('add-client-button');
    if (addClientButton) {
        addClientButton.addEventListener('click', openClientForm);
    }

    // Medical record page event listeners
    const medicalRecordsForm = document.getElementById('medical-records-form');
    if (medicalRecordsForm) {
        medicalRecordsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitMedicalRecord();
        });
    }

    // Close modal functionality
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
});

// Client management functions
function addClient() {
    const clientData = {
        name: document.getElementById('client-name').value,
        phoneNumber: document.getElementById('phone-number').value,
        address: document.getElementById('address').value,
        petsName: document.getElementById('pets-name').value
    };

    fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
    })
    .then(handleResponse)
    .then(data => {
        console.log('Client added:', data);
        alert('Client added successfully!');
        closeModal('add-client-modal');
        searchClients();
    })
    .catch(handleError);
}

function searchClients() {
    const query = document.getElementById('search-query').value;
    fetch(`/api/clients/search?term=${encodeURIComponent(query)}`)
        .then(handleResponse)
        .then(data => {
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = data.length === 0 ? '<p>No clients found.</p>' : 
                data.map(client => `
                    <div>
                        ${client.name} - ${client.phoneNumber || 'N/A'}, ${client.address || 'N/A'}
                        <button onclick="deleteClient('${client.id}')">Delete</button>
                    </div>
                `).join('');
            document.getElementById('search-results-modal').style.display = 'block';
        })
        .catch(handleError);
}

function deleteClient(clientId) {
    console.log("Attempting to delete client with ID:", clientId);
    if (!clientId) {
        console.error('Client ID is undefined');
        alert('Error: Client ID is undefined. Cannot delete client.');
        return;
    }

    fetch(`/api/clients/${clientId}`, { method: 'DELETE' })
    .then(handleResponse)
    .then(() => {
        alert('Client deleted successfully!');
        searchClients();
    })
    .catch(handleError);
}

// Medical record management functions
function submitMedicalRecord() {
    const recordData = {
        patient_id: document.getElementById('patient-id').value,
        date_of_visit: document.getElementById('date-of-visit').value,
        notes: document.getElementById('notes').value,
        treatment_plan: document.getElementById('treatment-plan').value
    };

    fetch('/api/patient-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData)
    })
    .then(handleResponse)
    .then(data => {
        alert('Medical record submitted successfully!');
        // Additional actions after successful submission
    })
    .catch(handleError);
}

// Modal control functions
function closeModal(modalId = '') {
    const modal = modalId ? document.getElementById(modalId) : document.querySelector('.modal.show');
    if (modal) {
        modal.style.display = 'none';
    }
}

function openClientForm() {
    const addClientModal = document.getElementById('add-client-modal');
    if (addClientModal) {
        addClientModal.style.display = 'block';
    }
}

// Response handling
function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();
}

function handleError(error) {
    console.error('Fetch error:', error);
    alert('An error occurred. Check the console for more details.');
}
