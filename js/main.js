
// Main JS File with document ready   

$(document).ready(function () {
    console.log("Hello")

    var renderFunc = m_data_render.renderCustomers;

    m_data_get.getCustomers(renderFunc);

    document.querySelector("#submitBtn").addEventListener('click', (e) => {
        const form = document.querySelector('#add-form');
        if (!form) {
            console.error('Formular nicht gefunden!');
            return;
        }

        // Werte erfassen
        const formData = new FormData(form);

        // Konvertiere FormData in JSON
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        switch (m_data_render.currentTable) {
            case "customers":
                m_data_post.postCustomer(renderFunc, data)
                break;
            case "employees":

                break;

            default:
                break;
        }

        console.log(data); // Ausgabe der Daten
    });

});

async function openDetailPopup(userId) {
    try {
        // Zeige den Bearbeiten-Button und setze die Werte in das Formular
        document.getElementById('edit-section').style.display = 'none';
        document.getElementById('edit-button').style.display = 'inline-block';
        document.getElementById('save-button').style.display = 'none';

        const editButton = document.getElementById('edit-button');
        editButton.onclick = () => {
            document.getElementById('edit-button').style.display = 'none';
            document.getElementById('save-button').style.display = 'inline-block';
            document.getElementById('edit-section').style.display = 'block';
        };

        const saveButton = document.getElementById('save-button');
        saveButton.onclick = () => {
            const updatedEmail = document.getElementById('edit-email').value;
            const updatedPhone = document.getElementById('edit-phone').value;
            const updatedAddress = document.getElementById('edit-address').value;

            // Daten bearbeiten (hier simuliert)
            document.getElementById('modal-email').textContent = updatedEmail;
            document.getElementById('modal-phone').textContent = updatedPhone;
            document.getElementById('modal-address').textContent = updatedAddress;

            // Verstecke das Bearbeiten-Formular und zeige die Buttons
            document.getElementById('edit-section').style.display = 'none';
            document.getElementById('edit-button').style.display = 'inline-block';
            document.getElementById('save-button').style.display = 'none';
        };

        const deleteButton = document.getElementById('delete-button');
        deleteButton.onclick = () => {
            deleteUser(userId);

            // Modal schließen
            const modalElement = document.getElementById('detailModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            } else {
                console.warn('Modal-Instanz konnte nicht gefunden werden.');
            }
        };

        // Modal anzeigen
        const modalElement = document.getElementById('detailModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } catch (error) {
        console.error('Fehler beim Laden der Benutzerdetails:', error);
    }
}


// Benutzer löschen
function deleteUser(userId) {
    const tableBody = document.getElementById('table-body');
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const cell = row.querySelector('td a');
        if (cell && cell.dataset.id == userId) {
            row.remove();
        }
    });
}


document.querySelector('.buttonaddnewcustomer').addEventListener('click', (e) => {

    if (m_data_render.currentTable === "customers") {
        console.log('customers');
        document.querySelector("#modal-body").innerHTML = `
        <form id="add-form">
                        <div class="mb-3">
                            <label for="add-companyname" class="form-label">Firmenname</label>
                            <input type="text" class="form-control" id="add-companyname" name="companyName">
                        </div>
                        <div class="mb-3">
                            <label for="add-email" class="form-label">E-Mail</label>
                            <input type="email" class="form-control" id="add-email" name="contactEmail">
                        </div>
                        <div class="mb-3">
                            <label for="add-phone" class="form-label">Telefonnummer</label>
                            <input type="text" class="form-control" id="add-phone" name="contactPhone">
                        </div>
                    </form>
        `;

        console.log("Kunde wird hinzugefügt");
    } else if (m_data_render.currentTable === "employees") {
        console.log('employees')
        document.querySelector("#modal-body").innerHTML = ``
    }
});



