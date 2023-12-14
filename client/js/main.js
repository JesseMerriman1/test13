document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners here
    const addClientForm = document.getElementById('add-client-form');
    addClientForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addClient();
    });

    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        searchClients();
    });

    const addClientButton = document.getElementById('add-client-button');
    addClientButton.addEventListener('click', openClientForm);

    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
});

function addClient() {
    // Add client logic
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
        alert('Client added successfully!');
        closeModal('add-client-modal');
        searchClients();
    })
    .catch(handleError);
}

function searchClients() {
    // Search clients logic
    const query = document.getElementById('search-query').value;
    fetch(`/api/clients/search?term=${encodeURIComponent(query)}`)
        .then(handleResponse)
        .then(data => displaySearchResults(data))
        .catch(handleError);
}

function deleteClient(phoneNumber) {
    // Delete client by phone number
    fetch(`/api/clients/phone/${phoneNumber}`, { method: 'DELETE' })
    .then(handleResponse)
    .then(() => {
        alert('Client deleted successfully!');
        searchClients();
    })
    .catch(handleError);
}

function displaySearchResults(data) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = data.map(client => `
        <div>
            ${client.name} - ${client.phoneNumber}, ${client.address}
            <button onclick="deleteClient('${client.phoneNumber}')">Delete</button>
        </div>
    `).join('');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

function openClientForm() {
    const addClientModal = document.getElementById('add-client-modal');
    addClientModal.style.display = 'block';
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function handleError(error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
}
