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


    // member variables
    m_data_render.customerId = null;



// m_data_render.renderCustomers ----------------------------------------------------------------------------------------------
	m_data_render.renderCustomers = function () {
        
        var customers, rows = "";

        if (!m_data_crud.finishedWithError) {
            m_data_render.currentTable = "customers";
            // get saved data
            customers = m_data_crud.dataStore.customers;
            

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
                            <button class="bi bi-eye buttonaddress" data-id="${obj.id}">
                            
                            </button>
                        </td>
                        <td class="text-center">
                            <button class="bi bi-eye buttonemployee" data-id="${obj.id}">

                            </button>
                        </td>
                    </tr> 
                `;
            }); 

            $("#table-title").html('Kundentabelle PoPokaka')
            $("#table-head").html(tableHead); 
            $("#table-body").html(rows);
            $("#button-back").css({"display" : "none"});

//Add click event to employee button ---------
            document.querySelectorAll('.buttonemployee').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    m_data_render.customerId = e.target.dataset.id;
                    
                    m_data_crud.getEmployeesByCustomerId(m_data_render.renderEmployees, m_data_render.customerId);
                });
            });

//Add click event to addresses button ---------
            document.querySelectorAll('.buttonaddress').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    m_data_render.customerId = e.target.dataset.id;
                    
                    m_data_crud.getAddressesByCustomerId(m_data_render.renderAddresses, m_data_render.customerId);
                });
            });
        } else {
            var alertHeading = "Error " + m_data_crud.error.code;
            var alertText = m_data_crud.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };

// render edit-Popup Customer -------------------------------------------------------------------------------------------------
    m_data_render.renderCustomerById = function () {

        var customer
        
        if (!m_data_crud.finishedWithError) {
            customer = m_data_crud.dataStore.customerById;

            $("#detailModalLabel").text(customer.companyName);
            $("#modal-email").text(customer.contactEmail);
            $("#modal-phone").text(customer.contactPhone);
        
        } else {
            var alertHeading = "Error " + m_data_crud.error.code;
            var alertText = m_data_crud.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };
    m_data_render.renderCustomerByIdFill = function () {

        var customer

        if (!m_data_crud.finishedWithError) {
            customer = m_data_crud.dataStore.customerById;

            $("#edit-companyname").val(customer.companyName);
            $("#edit-email").val(customer.contactEmail);
            $("#edit-phone").val(customer.contactPhone);            
        
        } else {
            var alertHeading = "Error " + m_data_crud.error.code;
            var alertText = m_data_crud.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };

// render edit-Popup Employees ------------------------------------------------------------------------------------------------

m_data_render.renderEmployeesById = function () {

    var employee

    if (!m_data_crud.finishedWithError) {
        var employee = m_data_crud.dataStore.employeeById;

        const fullName = `${employee.firstName} ${employee.lastName}`; 
        $("#detailModalLabel").text(fullName);
        $("#modal-email").text(employee.eMail);
        $("#modal-phone").text(employee.phoneNumber);
        $("#modal-position").text(employee.position);

    } else {
        var alertHeading = "Error " + m_data_crud.error.code;
        var alertText = m_data_crud.error.message;

        alert(alertHeading + ": " + alertText);
    }
};
m_data_render.renderEmployeesByIdFill = function () {

    var employee

    if (!m_data_crud.finishedWithError) {
        var employee = m_data_crud.dataStore.employeeById;
        
        
        $("#edit-employeesfirstName").val(employee.firstName);
        $("#edit-employeeslastName").val(employee.lastName);
        $("#edit-employeesMail").val(employee.eMail);
        $("#edit-employeesphoneNumber").val(employee.phoneNumber);
        $("#edit-employeesposition").val(employee.position);       
    
    } else {
        var alertHeading = "Error " + m_data_crud.error.code;
        var alertText = m_data_crud.error.message;

        alert(alertHeading + ": " + alertText);
    }
};

// render edit-Popup Adresses -------------------------------------------------------------------------------------------------

m_data_render.renderAdressesById = function () {

    var adresses

    if (!m_data_crud.finishedWithError) {
        var adresses = m_data_crud.dataStore.adressesById;
        console.log("Ich bin in der Render AdresseByID")
        console.log(m_data_crud.dataStore.adressesById)

      
        $("#detailModalLabel").text("Adresse");
        $("#modal-city").text(adresses.city);
        $("#modal-street").text(adresses.street);
        $("#modal-postalCode").text(adresses.postalCode);
        $("#modal-isHeadOffice").text(adresses.isHeadOffice);

    } else {
        var alertHeading = "Error " + m_data_crud.error.code;
        var alertText = m_data_crud.error.message;

        alert(alertHeading + ": " + alertText);
    }
};
m_data_render.renderAdressesByIdFill = function () {

    var adresses

    if (!m_data_crud.finishedWithError) {
        var adresses = m_data_crud.dataStore.adressesById;
        
      
        $("#edit-adressescity").text(adresses.city);
        $("#edit-adressesstreet").text(adresses.street);
        $("#edit-addresspostalCode").text(adresses.postalCode);
        $("#edit-isHeadOffice").text(adresses.isHeadOffice);
    
    } else {
        var alertHeading = "Error " + m_data_crud.error.code;
        var alertText = m_data_crud.error.message;

        alert(alertHeading + ": " + alertText);
    }
};

// render Employees -----------------------------------------------------------------------------------------------------------
    m_data_render.renderEmployees = function () {
        var employees, rows = "";
        if (!m_data_crud.finishedWithError) {
            m_data_render.currentTable = "employees";
            employees = m_data_crud.dataStore.employeesByCustomerId;
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
                        <td><a href="#" class="id-link" data-id="${emp.id}">${emp.id}</a></td>
                        <td>${fullName}</td>
                        <td>${emp.eMail}</td>
                        <td>${emp.position}</td>
                        <td>${emp.phoneNumber}</td>
                    </tr>
                `;
            });
            $("#table-title").html('Mitarbeitertabelle')
            $("#table-head").html(tableHead); 
            $("#table-body").html(rows);
            $("#button-back").css({"display" : "block"});
        } else {
            var alertHeading = "Error " + m_data_crud.error.code;
            var alertText = m_data_crud.error.message;
            alert(alertHeading + ": " + alertText);
        }
    };

// render Addresses -----------------------------------------------------------------------------------------------------------
    m_data_render.renderAddresses = function () {
        var addresses, rows = "";
        if (!m_data_crud.finishedWithError) {
            m_data_render.currentTable = "addresses";
            addresses = m_data_crud.dataStore.addressesByCustomerId;

            const tableHead = `
                <tr>
                    <th>ID</th>
                    <th>Straße</th>
                    <th>Postleitzahl</th>
                    <th>Stadt</th>
                    <th>Hauptstandort</th>
                </tr>
            `;
            
            addresses.forEach(addr => {
                rows += `
                    <tr>
                        <td><a href="#" class="id-link" data-id="${addr.id}">${addr.id}</a></td>
                        <td>${addr.street}</td>
                        <td>${addr.postalCode}</td>
                        <td>${addr.city}</td>
                        <td>${addr.isHeadOffice}</td>
                    </tr> 
                `;
                
            });  
            $("#table-title").html('Adressentabelle')
            $("#table-head").html(tableHead); 
            $("#table-body").html(rows);
            $("#button-back").css({"display" : "block"});
        } else {
            var alertHeading = "Error " + m_data_crud.error.code;
            var alertText = m_data_crud.error.message;

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
