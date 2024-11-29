/* ------------------------------------------------ */
/*   m_get_render.js - code for js object module    */
/*                     RENDERING DATA               */
/*                                                  */
/*   (C) 2021 Wappfactory - Michael Kreinbihl       */
/*                                                  */
/* ------------------------------------------------ */
/* jshint -W117 */

var m_data_render = (function () {
    "use strict";
    
    var m_data_render = {};

	m_data_render.init = function () {
	};


	m_data_render.renderCustomers = function () {

        // do rendering
        var customers, rows = "";

        if (!m_data_get.finishedWithError) {

            // get saved data
            customers = m_data_get.dataStore.customers;

            const tableHead = `
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Telefonnummer</th>
                    <th>Adresse</th>
                    <th>Mitarbeiter</th>
                </tr>
            `;
        
            customers.forEach(obj => {
                 rows += `
                    <tr>
                        <td><a href="#" class="id-link" data-id="${obj.id}">${obj.id}</a></td>
                        <td>${obj.firstName} ${obj.lastName}</td>
                        <td>${obj.contactEmail}</td>
                        <td>${obj.contactPhone}</td>
                        <td class="text-center"><i class="bi bi-eye eye-address" data-id="${obj.id}"></i></td>
                        <td class="text-center"><i class="bi bi-eye eye-employee" data-id="${obj.id}"></i></td>
                    </tr> 
                `;
                
            }); 
            $("#table-head").html(tableHead); 
            $("#table-body").html(rows);

            document.querySelectorAll('.id-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const userId = e.target.dataset.id;
                    var renderFunc = m_data_render.renderCustomerById
                    m_data_get.getCustomerById(renderFunc, userId);
                });
            });
        } else {
            var alertHeading = "Error " + m_data_get.error.code;
            var alertText = m_data_get.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };

    m_data_render.renderCustomerById = function () {

        var customer

        if (!m_data_get.finishedWithError) {
            customer = m_data_get.dataStore.customerById[1];
            console.log(customer)

            openDetailPopup(customer.id)

            $("#detailModalLabel").text(`${customer.firstName} ${customer.lastName}`); 
            $("#modal-email").text(customer.contactEmail);
            $("#modal-phone").text(customer.contactPhone);
            //$("#modal-address").text(`${data.address.street}, ${data.address.city}`);

        } else {
            var alertHeading = "Error " + m_data_get.error.code;
            var alertText = m_data_get.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };

    m_data_render.renderEmployees = function () {

        // do rendering
        var jsonObj, rows;

        if (!m_data_get.finishedWithError) {

            // get saved data
            jsonObj = m_data_get.dataStore;

            const tableHead = `
                <tr>
                    <th>ID</th>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>E-Mail</th>
                    <th>Position</th>
                    <th>Telefonnummer</th>
                </tr>
            `;
            
            jsonObj.forEach(obj => {
                 rows += `
                    <tr>
                        <td><a href="#" class="id-link" data-id="${obj.id}">${obj.id}</a></td>
                        <td>${obj.firstName}</td>
                        <td>${obj.lastName}</td>
                        <td>${obj.email}</td>
                        <td>${obj.position}</td>
                        <td>${obj.phoneNumber}</td>
                    </tr> 
                `;
                
            });  
           
            $("#table-body").html(rows);
        } else {
            var alertHeading = "Error " + m_data_get.error.code;
            var alertText = m_data_get.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };

    m_data_render.renderAddresses = function () {

        // do rendering
        var jsonObj, rows;

        if (!m_data_get.finishedWithError) {

            // get saved data
            jsonObj = m_data_get.dataStore;

            const tableHead = `
                <tr>
                    <th>ID</th>
                    <th>Postleitzahl</th>
                    <th>Stadt</th>
                    <th>Straße</th>
                    <th>Hausnummer</th>
                </tr>
            `;
            
            jsonObj.forEach(obj => {
                 rows += `
                    <tr>
                        <td><a href="#" class="id-link" data-id="${obj.id}">${obj.id}</a></td>
                        <td>${obj.firstName} ${obj.lastName}</td>
                        <td>${obj.contactEmail}</td>
                        <td>${obj.contactPhone}</td>
                        <td class="text-center"><i class="bi bi-eye eye-address" data-id="${obj.id}"></i></td>
                        <td class="text-center"><i class="bi bi-eye eye-employee" data-id="${obj.id}"></i></td>
                    </tr> 
                `;
                
            });  
           
            $("#table-body").html(rows);
        } else {
            var alertHeading = "Error " + m_data_get.error.code;
            var alertText = m_data_get.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };


    return m_data_render;

})();

/* 
 * Sometimes it it a good idea to do the init right here
 * after module is loaded, if so => remove comment chars //
*/ 

// m_data_render.init();
