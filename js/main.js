
// Main JS File with document ready   

$(document).ready(function () {
    console.log("Hello")

    var renderFunc = m_data_render.renderCustomers;

    m_data_get.getCustomers(renderFunc);
// EventListener für hinzugefügen von Werten ----------------------------------------------------------------------------------
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
                var renderFunc = m_data_render.renderCustomers;
                console.log(data)
                m_data_post.postCustomer(renderFunc, data)
                break;
            case "employees":

                break;

            default:
                break;
        }

        console.log(data); // Ausgabe der Daten
    });
// EventListener für bearbeiten von Werten ------------------------------------------------------------------------------------
    document.querySelector("#save-button").addEventListener('click', (e) => {
        const form = document.querySelector('#edit-form');
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

        const cId = document.querySelector('#edit-id').value;

        switch (m_data_render.currentTable) {
            case "customers":
                
                console.log("Ich bin in der Put-Funktion für Kunden")
                
                var renderFunc = m_data_render.renderCustomers;
                m_data_put.putCustomerById(renderFunc, cId, data)
                break;
            case "employees":

                break;

            default:
                break;
        }

        console.log(data); // Ausgabe der Daten
    });
// EventListener für löschen von Werten ---------------------------------------------------------------------------------------
    document.querySelector("#delete-button").addEventListener('click', (e) => {
        const form = document.querySelector('#edit-form');
        if (!form) {
            console.error('Formular nicht gefunden!');
            return;
        }
        
        // Werte erfassen
        const formData = new FormData(form);

        // Konvertiere FormData in JSON
        // const data = {};
        // formData.forEach((value, key) => {
        //     data[key] = value;
        // });

        const cId = document.querySelector('#edit-id').value;

        switch (m_data_render.currentTable) {
            case "customers":
                
                console.log("Ich bin in der delet-Funktion für Kunden")
                
                // var renderFunc = m_data_render.renderCustomers;
                m_data_delete.deleteCustomerById(m_data_render.renderCustomers, cId)
                break;
            case "employees":

                break;

            default:
                break;
        }

        console.log("löschen erfolgreich");
    });

});

$("#delete-button")




// // Benutzer löschen
// function deleteUser(userId) {
//     const tableBody = document.getElementById('table-body');
//     const rows = tableBody.querySelectorAll('tr');
//     rows.forEach(row => {
//         const cell = row.querySelector('td a');
//         if (cell && cell.dataset.id == userId) {
//             row.remove();
//         }
//     });
// }

// Hinzugefügen von Wertem ----------------------------------------------------------------------------------------------------
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
        document.querySelector("#modal-body").innerHTML = `
        <form id="add-form">
                        <div class="mb-3">
                            <label for="add-employeesfirstName" class="form-label">Vorname</label>
                            <input type="text" class="form-control" id="add-employeesfirstName" name="firstName">
                        </div>
                        <div class="mb-3">
                            <label for="add-employeeslastName" class="form-label">Nachname</label>
                            <input type="text" class="form-control" id="add-employeeslastName" name="lastName">
                        </div>
                        <div class="mb-3">
                            <label for="add-employeesposition" class="form-label">Position</label>
                            <input type="text" class="form-control" id="add-employeesposition" name="position">
                        </div>
                        <div class="mb-3">
                            <label for="add-employeesphoneNumber" class="form-label">Telefonnummer</label>
                            <input type="text" class="form-control" id="add-employeesphoneNumber" name="phoneNumber">
                        </div>
                        <div class="mb-3">
                            <label for="add-employeesMail" class="form-label">E-Mail Adresse</label>
                            <input type="email" class="form-control" id="add-employeesMail" name="eMail">
                        </div>
                    </form>
        `
    }
    else if (m_data_render.currentTable === "addresses") {
        console.log('adresses')
        document.querySelector("#modal-body").innerHTML = `
        <form id="add-form">
                        <div class="mb-3">
                            <label for="add-addressstreet" class="form-label">Straße & Hausnummer</label>
                            <input type="text" class="form-control" id="add-addressstreet" name="street">
                        </div>
                        <div class="mb-3">
                            <label for="add-addresscity" class="form-label">Nachname</label>
                            <input type="text" class="form-control" id="add-addresscity" name="city">
                        </div>
                        <div class="mb-3">
                            <label for="add-addresspostalCode" class="form-label">Postleitzahl</label>
                            <input type="text" class="form-control" id="add-addresspostalCode" name="postalCode">
                        </div>
                    </form>
        `
    }
});


// Bearbeiten von Werten-------------------------------------------------------------------------------------------------------

document.querySelector('#table-body').addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('id-link')) {
        const cId = e.target.dataset.id;
        console.log(`ID geklickt: ${cId}`);

        if (m_data_render.currentTable === "customers") {
            console.log('customers');
            document.querySelector("#modal-body-edit").innerHTML = `
                    <p><strong>E-Mail:</strong> <span id="modal-email"></span></p>
                    <p><strong>Telefonnummer:</strong> <span id="modal-phone"></span></p>
                    <div id="edit-section" class="mt-3" style="display: none;">
                        <h4>Bearbeite die Daten:</h6>
                    </div> 

        <form id="edit-form">
                                <input type="hidden"  class="form-control" id="edit-id" value="${cId}" name="id">

                                <div class="mb-3">
                                    <label for="edit-companyname" class="form-label">Firmenname</label>
                                    <input type="text" class="form-control" id="edit-companyname" name="companyName">
                                </div>
                                <div class="mb-3">
                                    <label for="edit-email" class="form-label">E-Mail</label>
                                    <input type="email" class="form-control" id="edit-email" name="contactEmail">
                                </div>
                                <div class="mb-3">
                                    <label for="edit-phone" class="form-label">Telefonnummer</label>
                                   <input type="text" class="form-control" id="edit-phone" name="contactPhone">
                                </div>
                            </form>
        `;

            console.log("Edit-Form wurde aufgerufen");
        } else if (m_data_render.currentTable === "employees") {
            console.log('employees')
            document.querySelector("#modal-body").innerHTML = `
       
        `
        }
        else if (m_data_render.currentTable === "addresses") {
            console.log('employees')
            document.querySelector("#modal-body").innerHTML = `
        
        `
        }
    }
});

async function openDetailPopup(userId) {
    try {
        // Zeige den Bearbeiten-Button und setze die Werte in das Formular
        document.getElementById('edit-form').style.display = 'none';
        document.getElementById('edit-button').style.display = 'inline-block';
        document.getElementById('save-button').style.display = 'none';

        const editButton = document.getElementById('edit-button');
        editButton.onclick = () => {
            document.getElementById('edit-button').style.display = 'none';
            document.getElementById('save-button').style.display = 'inline-block';
            document.getElementById('edit-form').style.display = 'block';
        };

        // const saveButton = document.getElementById('save-button');
        // saveButton.onclick = () => {
        //     // const updatedEmail = document.getElementById('contactEmail').value;
        //     // const updatedPhone = document.getElementById('contactPhone').value;
        //     // const updatedAddress = document.getElementById('companyname').value;

        //     // Daten bearbeiten (hier simuliert)
        //     // document.getElementById('modal-email').textContent = updatedEmail;
        //     // document.getElementById('modal-phone').textContent = updatedPhone;
        //     // document.getElementById('modal-address').textContent = updatedAddress;

        //     // Verstecke das Bearbeiten-Formular und zeige die Buttons
        //     document.getElementById('edit-form').style.display = 'none';
        //     document.getElementById('edit-button').style.display = 'inline-block';
        //     document.getElementById('save-button').style.display = 'none';
        // };

        // const deleteButton = document.getElementById('delete-button');
        // deleteButton.onclick = () => {
            

        //     // Modal schließen
        //     const modalElement = document.getElementById('detailModal');
        //     const modal = bootstrap.Modal.getInstance(modalElement);
        //     if (modal) {
        //         modal.hide();
        //     } else {
        //         console.warn('Modal-Instanz konnte nicht gefunden werden.');
        //     }
        // };

        // Modal anzeigen
        const modalElement = document.getElementById('detailModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } catch (error) {
        console.error('Fehler beim Laden der Benutzerdetails:', error);
    }
}
