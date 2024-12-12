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

    m_data_render.currentTable = "";

	m_data_render.init = function () {
	};


	m_data_render.renderCustomers = function () {
        console.log('render customers')
        var customers, rows = "";

        if (!m_data_get.finishedWithError) {
            m_data_render.currentTable = "customers";
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
                        <td>${obj.companyName}</td>
                        <td>${obj.contactEmail}</td>
                        <td>${obj.contactPhone}</td>
                        <td class="text-center">
                            <button class="bi bi-eye buttonadress" data-id="${obj.id}">
                            
                            </button>
                        </td>
                        <td class="text-center">
                            <button class="bi bi-eye buttonemployee" data-id="${obj.id}">

                            </button>
                        </td>
                    </tr> 
                `;
                
            }); 
            $("#table-head").html(tableHead); 
            $("#table-body").html(rows);


            document.querySelectorAll('.buttonemployee').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const customerId = e.target.dataset.id;
                    
                    var renderFunc = m_data_render.renderEmployees;
                    m_data_get.getEmployeesByCustomerId(renderFunc, customerId);
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
            customer = m_data_get.dataStore.customerById;
            console.log("renderCustomerById")

            console.log('Kundendaten geladen:', customer);

            $("#detailModalLabel").text(customer.companyName);
            $("#modal-email").text(customer.contactEmail);
            $("#modal-phone").text(customer.contactPhone);
        
           
            
            console.log("Kundenname", customer.companyName)
        } else {
            var alertHeading = "Error " + m_data_get.error.code;
            var alertText = m_data_get.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };
    m_data_render.renderCustomerByIdFill = function () {

        var customer

        if (!m_data_get.finishedWithError) {
            customer = m_data_get.dataStore.customerById;
            console.log("renderCustomerById")

            console.log('Kundendaten geladen:', customer);

            $("#edit-companyname").val(customer.companyName);
            $("#edit-email").val(customer.contactEmail);
            $("#edit-phone").val(customer.contactPhone);            
        
            console.log("Kundenname", customer.companyName)
        } else {
            var alertHeading = "Error " + m_data_get.error.code;
            var alertText = m_data_get.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };

    m_data_render.renderEmployees = function () {
        var employees, rows = "";
        if (!m_data_get.finishedWithError) {
            m_data_render.currentTable = "employees";
            // get saved data
            employees = m_data_get.dataStore.employeesByCustomerId;
            console.log(employees)

            const tableHead = `
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Position</th>
                    <th>Telefonnummer</th>
                </tr>
            `;
            
            employees.forEach(emp => {
                const fullName = `${emp.firstName} ${emp.lastName}`;
                rows += `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${fullName}</td>
                        <td>${emp.email}</td>
                        <td>${emp.position}</td>
                        <td>${emp.phoneNumber}</td>
                    </tr>
                `;
            });
                
            $("#table-head").html(tableHead); 
            $("#table-body").html(rows);
        } else {
            var alertHeading = "Error " + m_data_get.error.code;
            var alertText = m_data_get.error.message;
            alert(alertHeading + ": " + alertText);
        }
    };

    // m_data_render.renderAddresses = function (addresses) {

    //     // do rendering
    //     
    //     var jsonObj, rows;

    //     if (!m_data_get.finishedWithError) {
    //         m_data_render.currentTable = "addresses";
    //         // get saved data
    //         jsonObj = m_data_get.dataStore;

    //         const tableHead = `
    //             <tr>
    //                 <th>ID</th>
    //                 <th>Postleitzahl</th>
    //                 <th>Stadt</th>
    //                 <th>Straße</th>
    //                 <th>Hausnummer</th>
    //             </tr>
    //         `;
            
    //         jsonObj.forEach(obj => {
    //              rows += `
    //                 <tr>
    //                     <td>${obj.id}</td>
    //                     <td>${obj.postCode}</td>
    //                     <td>${obj.city}</td>
    //                     <td>${obj.street}</td>
    //                     <td>${obj.houseNumber}</td>
    //                 </tr> 
    //             `;
                
    //         });  
           
    //         $("#table-body").html(rows);
    //     } else {
    //         var alertHeading = "Error " + m_data_get.error.code;
    //         var alertText = m_data_get.error.message;

    //         alert(alertHeading + ": " + alertText);
    //     }
    // };


    return m_data_render;

})();

/* 
 * Sometimes it it a good idea to do the init right here
 * after module is loaded, if so => remove comment chars //
*/ 

// m_data_render.init();
