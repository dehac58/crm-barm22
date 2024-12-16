
// Main JS File with document ready   

$(document).ready(function () {

    var renderFunc = m_data_render.renderCustomers;

    m_data_crud.getCustomers(renderFunc);

    // EventListener für hinzugefügen von Werten ----------------------------------------------------------------------------------
    document.querySelector("#submitBtn").addEventListener('click', (e) => {
        const form = document.querySelector('#add-form');
        if (!form) {
            console.error('Formular nicht gefunden!');
            return;
        }

        const formData = new FormData(form);
        let isValid = true;
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value; 
            if (value === '') { 
                isValid = false;
                const inputField = form.querySelector([name="${key}"]);
                if (inputField) {
                    inputField.classList.add('is-invalid'); 
                }
            }
        });

        if (!isValid) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }
        switch (m_data_render.currentTable) {
            case "customers":
                m_data_crud.postCustomer(() => {
                    m_data_crud.getCustomers(m_data_render.renderCustomers);
                }, data);
                break;
            case "employees":
                data['customerID'] = m_data_render.customerId;
                m_data_crud.postEmployee(() => {
                    m_data_crud.getEmployeesByCustomerId(m_data_render.renderEmployees, m_data_render.customerId);
                }, data);
                break;
            case "addresses":
                m_data_crud.postAddress(() => {
                    m_data_crud.getAddressesByCustomerId(m_data_render.renderAddresses, m_data_render.customerId);
                }, m_data_render.customerId, {
                    ...data,
                    isHeadOffice: $("#edit-isHeadOffice").is(':checked') ? 1 : 0
                });
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

        const formData = new FormData(form);
        let isValid = true;
        const data = {};

        
        formData.forEach((value, key) => {
            data[key] = value; 
            if (value === '') { 
                isValid = false;
                const inputField = form.querySelector([name="${key}"]);
                if (inputField) {
                    inputField.classList.add('is-invalid'); 
                }
            }
        });

        if (!isValid) {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }

        switch (m_data_render.currentTable) {
            case "customers":

                m_data_crud.putCustomerById(() => {
                    m_data_crud.getCustomers(m_data_render.renderCustomers);
                }, m_data_crud.dataStore.customerById.id, data);
                break;
            case "employees":
                m_data_crud.putEmployeeById(() => {
                    m_data_crud.getEmployeesByCustomerId(m_data_render.renderEmployees, m_data_render.customerId);
                }, m_data_crud.dataStore.employeeById.id, data);
                break;
            case "addresses":
                m_data_crud.putAddressById(() => {
                    m_data_crud.getAddressesByCustomerId(m_data_render.renderAddresses, m_data_render.customerId);
                }, m_data_render.customerId, m_data_crud.dataStore.addressById.id, {
                    ...data,
                    isHeadOffice: $("#edit-isHeadOffice").is(':checked') ? 1 : 0
                });
                break;

            default:
                break;
        }

    });


    // EventListener für löschen von Werten -----------------------------------------------------------------------------------
    document.querySelector("#delete-button").addEventListener('click', (e) => {
        const form = document.querySelector('#edit-form');
        if (!form) {
            console.error('Formular nicht gefunden!');
            return;
        }

        switch (m_data_render.currentTable) {
            case "customers":
                m_data_crud.deleteCustomerById(() => {
                    m_data_crud.getCustomers(m_data_render.renderCustomers);
                }, m_data_crud.dataStore.customerById.id);
                break;
            case "employees":
                m_data_crud.deleteEmployeeById(() => {
                    m_data_crud.getEmployeesByCustomerId(m_data_render.renderEmployees, m_data_render.customerId);
                }, m_data_crud.dataStore.employeeById.id);
                break;
                case "addresses":
                m_data_crud.deleteAddressById(() => {
                    m_data_crud.getAddressesByCustomerId(m_data_render.renderAddresses, m_data_render.customerId);
                }, m_data_render.customerId, m_data_crud.dataStore.addressById.id);
                break;
            default:
                break;
        }

        console.log("löschen erfolgreich");
    });

    // Validierung der Eingaben -----------------------------------------------------------------------------------------------

    function validateFormFields(formId) {
        const form = document.querySelector(formId);
        if (!form) {
            return false;
        }
    
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
    
        inputs.forEach(input => {
            input.classList.remove('is-invalid');
            let feedback = input.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.remove();
            }
    
            if (input.value.trim() === '') {
                isValid = false;
                input.classList.add('is-invalid');
    
                feedback = document.createElement('div');
                feedback.classList.add('invalid-feedback');
                feedback.textContent = 'Dieses Feld darf nicht leer sein.';
                input.parentNode.appendChild(feedback);
            } else if (input.type === 'email' && !validateEmail(input.value.trim())) {
                isValid = false;
                input.classList.add('is-invalid'); 
    
                feedback = document.createElement('div');
                feedback.classList.add('invalid-feedback');
                feedback.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
                input.parentNode.appendChild(feedback);
            } else if (input.name.toLowerCase().includes('phone') && !validatePhoneNumber(input.value.trim())) {
                isValid = false;
                input.classList.add('is-invalid');

                feedback = document.createElement('div');
                feedback.classList.add('invalid-feedback');
                feedback.textContent = 'Telefonnummer darf nur Zahlen, Leerzeichen und + enthalten.';
                input.parentNode.appendChild(feedback);
            }
        });
    
        return isValid;
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhoneNumber(phone) {
        const phoneRegex = /^[0-9+\s]+$/;
        return phoneRegex.test(phone);
    }
    
    const submitButton = document.querySelector('#submitBtn');
    const saveButton = document.querySelector('#save-button');
    const modalAdd = document.querySelector('#buttonaddnewcustomer');
    const modalEdit = document.querySelector('#detailModal');
    
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            if (validateFormFields('#add-form')) {
                console.log('Formular ist gültig. Daten können gesendet werden.');
                if (modalAdd) {
                    const bootstrapModal = bootstrap.Modal.getInstance(modalAdd);
                    bootstrapModal.hide();
                }
            } else {
                console.log('Formular ist ungültig. Daten werden nicht gesendet.');
            }
        });
    }
    
    if (saveButton) {
        saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (validateFormFields('#edit-form')) {
                if (modalEdit) {
                    const bootstrapModal = bootstrap.Modal.getInstance(modalEdit);
                    bootstrapModal.hide();
                }
            } else {
                console.log('Formular ist ungültig. Änderungen werden nicht gespeichert.');
            }
        });
    }
    
    async function safeSubmitForm(callback, formId, modal) {
        if (validateFormFields(formId)) {
            await callback();
            if (modal) {
                const bootstrapModal = bootstrap.Modal.getInstance(modal);
                bootstrapModal.hide();
            }
        } else {
            console.log('Formular ist ungültig. Vorgang wird abgebrochen.');
        }
    }
    
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            safeSubmitForm(() => {
                console.log('Formular erfolgreich hinzugefügt.');
            }, '#add-form', modalAdd);
        });
    }
    
    if (saveButton) {
        saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            safeSubmitForm(() => {
                console.log('Änderungen erfolgreich gespeichert.');
            }, '#edit-form', modalEdit);
        });
    }
    

// Zurückbutton ---------------------------------------------------------------------------------------------------------------
    $("#button-back").click(function () {
        console.log("Button gedrückt")
        var renderFunc = m_data_render.renderCustomers;
        m_data_crud.getCustomers(renderFunc);
    })
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
        console.log('addresses')
        document.querySelector("#modal-body").innerHTML = `
        <form id="add-form">
            <div class="mb-3">
                <label for="add-addressstreet" class="form-label">Straße & Hausnummer</label>
                <input type="text" class="form-control" id="add-addressstreet" name="street">
            </div>
            <div class="mb-3">
                <label for="add-addresscity" class="form-label">Stadt</label>
                <input type="text" class="form-control" id="add-addresscity" name="city">
            </div>
            <div class="mb-3">
                <label for="add-addresspostalCode" class="form-label">Postleitzahl</label>
                <input type="text" class="form-control" id="add-addresspostalCode" name="postalCode">
            </div>
            <div class="mb-3">
                <input type="hidden" name="isHeadOffice" value="false">
                <input type="checkbox" class="form-check-input" id="add-isHeadOffice" name="isHeadOffice" value="true">
                <label for="add-isHeadOffice" class="form-check-label">Hauptstandort</label>
            </div>
        </form> 
        `
        console.log("Kunde wird hinzugefügt");
    }
    
});


// Bearbeiten von Werten-------------------------------------------------------------------------------------------------------
document.querySelector('#table-body').addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('id-link')) {
        const id = e.target.dataset.id;

        if (m_data_render.currentTable === "customers") {
            e.preventDefault();
            var renderFunc = m_data_render.renderCustomerById
            m_data_crud.getCustomerById(renderFunc, id);


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

            openDetailPopup(id)
            console.log("Edit-Form wurde aufgerufen");
        } else if (m_data_render.currentTable === "employees") {


            e.preventDefault();

            var renderFunc = m_data_render.renderEmployeesById
            m_data_crud.getEmployeeById(renderFunc, id);
            console.log("m_data_render")

            document.querySelector("#modal-body-edit").innerHTML = `

                    <p><strong>E-Mail:</strong> <span id="modal-email" ></span></p>
                    <p><strong>Telefonnummer:</strong> <span id="modal-phone"></span></p>
                    <p><strong>Position:</strong> <span id="modal-position"></span></p>
                    <div id="edit-section" class="mt-3" style="display: none;">
                        <h4>Bearbeite die Daten:</h6>
                    </div> 

                <form id="edit-form">

                        <div class="mb-3">
                            <label for="edit-employeesfirstName" class="form-label">Vorname</label>
                            <input type="text" class="form-control" id="edit-employeesfirstName" name="firstName">
                        </div>
                        <div class="mb-3">
                            <label for="edit-employeeslastName" class="form-label">Nachname</label>
                            <input type="text" class="form-control" id="edit-employeeslastName" name="lastName">
                        </div>
                        <div class="mb-3">
                            <label for="edit-employeesposition" class="form-label">Position</label>
                            <input type="text" class="form-control" id="edit-employeesposition" name="position">
                        </div>
                        <div class="mb-3">
                            <label for="edit-employeesphoneNumber" class="form-label">Telefonnummer</label>
                            <input type="text" class="form-control" id="edit-employeesphoneNumber" name="phoneNumber">
                        </div>
                        <div class="mb-3">
                            < for="edit-employeesMail" class="form-label">E-Mail Adresse</label>
                            <input type="email" class="form-control" id="edit-employeesMail" name="eMail">
                        </div>
                            </form>
            `;

            openDetailPopup(id)
        } else if (m_data_render.currentTable === "addresses") {
            e.preventDefault();
            var renderFunc = m_data_render.renderAddressesById
            m_data_crud.getAddressById(renderFunc, id);

            document.querySelector("#modal-body-edit").innerHTML = `
                    <p><strong>Stadt:</strong> <span id="modal-city"></span></p>
                    <p><strong>Straße und Hausnummer:</strong> <span id="modal-street"></span></p>
                    <p><strong>Postleitzahl:</strong> <span id="modal-postalCode"></span></p>
                    <p><strong>Hauptstandort:</strong> <span id="modal-isHeadOffice"></span></p>

                    <div id="edit-section" class="mt-3" style="display: none;">
                        <h4>Bearbeite die Daten:</h6>
                    </div> 

             <form id="edit-form">
                        <div class="mb-3">
                            <label for="edit-addressescity" class="form-label">Stadt</label>
                            <input type="text" class="form-control" id="edit-addressescity" name="city">
                        </div>
                        <div class="mb-3">
                            <label for="edit-addressesstreet" class="form-label">Straße & Hausnummer</label>
                            <input type="text" class="form-control" id="edit-addressesstreet" name="street">
                        </div>
                        
                        <div class="mb-3">
                            <label for="edit-addresspostalCode" class="form-label">Postleitzahl</label>
                            <input type="text" class="form-control" id="edit-addresspostalCode" name="postalCode">
                        </div>
                        <div class="mb-3">
                            <input type="hidden" name="isHeadOffice" value="false" id="edit-hiddenInput">
                            <input type="checkbox" class="form-check-input" id="edit-isHeadOffice" name="isHeadOffice" value="true">
                            <label for="add-isHeadOffice" class="form-check-label">Hauptstandort</label>
                        </div>
                </form>
        
        `
            openDetailPopup(id)
        }
    }
});

async function openDetailPopup(id) {
    try {
        document.getElementById('edit-form').style.display = 'none';
        document.getElementById('edit-button').style.display = 'inline-block';
        document.getElementById('save-button').style.display = 'none';
        const editButton = document.getElementById('edit-button');
        switch (m_data_render.currentTable) {

            case "customers":

                editButton.onclick = () => {

                    var renderFunc = m_data_render.renderCustomerByIdFill
                    m_data_crud.getCustomerById(renderFunc, id);

                    document.getElementById('edit-button').style.display = 'none';
                    document.getElementById('save-button').style.display = 'inline-block';
                    document.getElementById('edit-form').style.display = 'block';
                };

                break;
            case "employees":
                editButton.onclick = () => {

                    var renderFunc = m_data_render.renderEmployeesByIdFill
                    m_data_crud.getEmployeeById(renderFunc, id);

                    document.getElementById('edit-button').style.display = 'none';
                    document.getElementById('save-button').style.display = 'inline-block';
                    document.getElementById('edit-form').style.display = 'block';
                };

                break;
            case "addresses":
                editButton.onclick = () => {
                    console.log("Ich brauch Daten der Adresse", id)
                    var renderFunc = m_data_render.renderAddressesByIdFill
                    m_data_crud.getAddressById(renderFunc, id);

                    document.getElementById('edit-button').style.display = 'none';
                    document.getElementById('save-button').style.display = 'inline-block';
                    document.getElementById('edit-form').style.display = 'block';
                };

                break
            default:
                break;
        }

        const modalElement = document.getElementById('detailModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } catch (error) {
        console.error('Fehler beim Laden der Benutzerdetails:', error);
    }

}


