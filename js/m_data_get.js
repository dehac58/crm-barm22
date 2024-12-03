var m_data_get = (function () {
    "use strict";
    // Application object.
const baseUrl = "https://dev.wappprojects.de/wiws22i/"

    const m_data_get = {
        getEmployees: (do_next_func) => { exchangeDataWithAjax(do_next_func, "employees", `${baseUrl}employees`); },
        getEmployeeById: (do_next_func, eId) => { exchangeDataWithAjax(do_next_func, "employeeById", `${baseUrl}employees/${eId}`); },
        getCustomers: (do_next_func) => { exchangeDataWithAjax(do_next_func, "customers", `${baseUrl}customers`); },
        getCustomerById: (do_next_func, cId) => { exchangeDataWithAjax(do_next_func, "customerById", `${baseUrl}customers/${cId}`); },
        getEmployeesByCustomerId: (do_next_func) => { exchangeDataWithAjax(do_next_func, "employeesByCustomerId", ""); },
        getEmployeeByIdByCustomerId: (do_next_func) => { exchangeDataWithAjax(do_next_func, "employeeByIdByCustomerId", ""); },
        getAddressesByCustomerId: (do_next_func) => { exchangeDataWithAjax(do_next_func, "addressesByCustomerId", ""); }
    };

    //************************************************
    // member variables

	m_data_get.dataStore = {};
    m_data_get.finishedWithError = false;
    m_data_get.error = {};
	

    //************************************************
    // get json data with ajax

	const exchangeDataWithAjax = (do_next_func, routeKey, url) => {


        function success_func (result) {
           if (result !== null) {
                m_data_get.dataStore[routeKey] = result;
            } else {
                m_data_get.dataStore[routeKey] = {};
            }

            do_next_func();

        };

        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            m_data_get.dataStore[routeKey] = {};
            m_data_get.finishedWithError = true;
            m_data_get.error.status = status;
            m_data_get.error.code = xhr.status;
            m_data_get.error.message = error;

            do_next_func();
        };
        const username = "crm";
        const password = "22i-dev_pathxaxs" 

        $.ajax({
            method: "GET",
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            },
            success: success_func,
            error: error_func,
        });
    };

    return m_data_get;
})();

