
// Main JS File with document ready   

$(document).ready(function () {

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
                m_data_post.postCustomer(() => {
                    m_data_get.getCustomers(m_data_render.renderCustomers);
                }, data);
                break;
            case "employees":
                data['customerID'] = m_data_render.customerId;
                m_data_post.postEmployee(() => {
                    m_data_get.getEmployeesByCustomerId(m_data_render.renderEmployees, m_data_render.customerId);
                }, data);


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

        switch (m_data_render.currentTable) {
            case "customers":
                
                m_data_put.putCustomerById(() => {
                    m_data_get.getCustomers(m_data_render.renderCustomers);
                }, m_data_get.dataStore.customerById.id, data);

                break;
            case "employees":
              
                m_data_put.putEmployeeById(() => {
                    m_data_get.getEmployeesByCustomerId(m_data_render.renderEmployees, m_data_render.customerId);
                }, m_data_get.dataStore.employeeById.id, data);


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

        switch (m_data_render.currentTable) {
            case "customers":
                m_data_delete.deleteCustomerById(() => {
                    m_data_get.getCustomers(m_data_render.renderCustomers);
                }, m_data_get.dataStore.customerById.id);
                break;
            case "employees":
                m_data_delete.deleteEmployeeById(() => {
                    m_data_get.getEmployeesByCustomerId(m_data_render.renderEmployees, m_data_render.customerId);
                }, m_data_get.dataStore.employeeById.id);


                break;

            default:
                break;
        }

        console.log("löschen erfolgreich");
    });

});

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

            customer = m_data_get.dataStore.customerById;
            e.preventDefault();

            var renderFunc = m_data_render.renderCustomerById
            m_data_get.getCustomerById(renderFunc, cId);

      
            document.querySelector("#modal-body-edit").innerHTML = `
                    <p><strong>E-Mail:</strong> <span id="modal-email" ></span></p>
                    <p><strong>Telefonnummer:</strong> <span id="modal-phone"></span></p>
                    <div id="edit-section" class="mt-3" style="display: none;">
                        <h4>Bearbeite die Daten:</h6>
                    </div> 

        <form id="edit-form">

                                <div class="mb-3">
                                    <label for="edit-companyname" class="form-label">Firmenname</label>
                                    <input type="text" class="form-control" id="edit-companyname" name="companyName">
                                </div>
                                <div class="mb-3">
                                    <label for="edit-email" class="form-label">E-Mail</label>
                                    <input type="email" class="form-control" id="edit-email"  name="contactEmail">
                                </div>
                                <div class="mb-3">
                                    <label for="edit-phone" class="form-label">Telefonnummer</label>
                                   <input type="text" class="form-control" id="edit-phone" name="contactPhone">
                                </div>
                            </form>
        `;

            openDetailPopup(cId)
            console.log("Edit-Form wurde aufgerufen");
        } else if (m_data_render.currentTable === "employees") {
            console.log('employees')
            console.log(`ID geklickt: ${cId}`);

            employees = m_data_get.dataStore.employeeById;
            e.preventDefault();

            var renderFunc = m_data_render.renderEmployeesById
            m_data_get.getEmployeeById(renderFunc, cId);
            console.log("m_data_render")

            // customer = m_data_get.dataStore.customerById;
            // e.preventDefault();
            // var renderFunc = m_data_render.renderEmployeesById
            // m_data_get.getEmployeesByCustomerId(renderFunc, cId);


            document.querySelector("#modal-body-edit").innerHTML = `

                    <p><strong>E-Mail:</strong> <span id="modal-email" ></span></p>
                    <p><strong>Telefonnummer:</strong> <span id="modal-phone"></span></p>
                    <p><strong>Position:</strong> <span id="modal-position"></span></p>
                    <div id="edit-section" class="mt-3" style="display: none;">
                        <h4>Bearbeite die Daten:</h6>
                    </div> 

                <form id="edit-form">

                        <div class="mb-3">
                            <label for="add-employeesfirstName" class="form-label">Vorname</label>
                            <input type="text" class="form-control" id="edit-employeesfirstName" name="firstName">
                        </div>
                        <div class="mb-3">
                            <label for="add-employeeslastName" class="form-label">Nachname</label>
                            <input type="text" class="form-control" id="edit-employeeslastName" name="lastName">
                        </div>
                        <div class="mb-3">
                            <label for="add-employeesposition" class="form-label">Position</label>
                            <input type="text" class="form-control" id="edit-employeesposition" name="position">
                        </div>
                        <div class="mb-3">
                            <label for="add-employeesphoneNumber" class="form-label">Telefonnummer</label>
                            <input type="text" class="form-control" id="edit-employeesphoneNumber" name="phoneNumber">
                        </div>
                        <div class="mb-3">
                            <label for="add-employeesMail" class="form-label">E-Mail Adresse</label>
                            <input type="email" class="form-control" id="edit-employeesMail" name="eMail">
                        </div>
                            </form>
        `;

        console.log(`ID Mitarbeiter geklickt: ${cId}`)
            openDetailPopup(cId)
            console.log("Edit-Form wurde aufgerufen");
        }
        else if (m_data_render.currentTable === "addresses") {
            console.log('employees')
            document.querySelector("#modal-body").innerHTML = `
        
        `
        }
    }
});

async function openDetailPopup(cId) {
    try {
        console.log("openDetailPopup")
        // Zeige den Bearbeiten-Button und setze die Werte in das Formular
        document.getElementById('edit-form').style.display = 'none';
        document.getElementById('edit-button').style.display = 'inline-block';
        document.getElementById('save-button').style.display = 'none';
        const editButton = document.getElementById('edit-button');
        switch (m_data_render.currentTable) {

            case "customers":

                editButton.onclick = () => {

                    var renderFunc = m_data_render.renderCustomerByIdFill
                    m_data_get.getCustomerById(renderFunc, cId);

                    document.getElementById('edit-button').style.display = 'none';
                    document.getElementById('save-button').style.display = 'inline-block';
                    document.getElementById('edit-form').style.display = 'block';
                };

                break;
            case "employees":
                editButton.onclick = () => {

                    var renderFunc = m_data_render.renderEmployeesByIdFill
                    m_data_get.getEmployeeById(renderFunc, cId);

                    document.getElementById('edit-button').style.display = 'none';
                    document.getElementById('save-button').style.display = 'inline-block';
                    document.getElementById('edit-form').style.display = 'block';
                };

                break;

            default:
                break;
        }

        // Modal anzeigen
        const modalElement = document.getElementById('detailModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } catch (error) {
        console.error('Fehler beim Laden der Benutzerdetails:', error);
    }
}
