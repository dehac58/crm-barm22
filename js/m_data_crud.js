var m_data_crud = (function () {
    "use strict";
    // Base URL for API
    const baseUrl = "https://dev.wappprojects.de/wiws22i/";

    // Application object
    const m_data_crud = {
        getEmployees: (do_next_func) => { exchangeDataWithAjax(do_next_func, "employees", `${baseUrl}employees`, 'GET'); },
        getEmployeeById: (do_next_func, employeeId) => { exchangeDataWithAjax(do_next_func, "employeeById", `${baseUrl}employees/${employeeId}`, 'GET'); },
        getCustomers: (do_next_func) => { exchangeDataWithAjax(do_next_func, "customers", `${baseUrl}customers`, 'GET'); },
        getCustomerById: (do_next_func, customerId) => { exchangeDataWithAjax(do_next_func, "customerById", `${baseUrl}customers/${customerId}`, 'GET'); },
        getEmployeesByCustomerId: (do_next_func, customerId) => { exchangeDataWithAjax(do_next_func, "employeesByCustomerId", `${baseUrl}customers/${customerId}/employees`, 'GET'); },
        getEmployeeByIdByCustomerId: (do_next_func, customerId, employeeId) => { exchangeDataWithAjax(do_next_func, "employeeByIdByCustomerId", `${baseUrl}customers/${customerId}/employees/${employeeId}`, 'GET'); },
        getAddressById: (do_next_func, addressId) => { exchangeDataWithAjax(do_next_func, "addressById", `${baseUrl}addresses/${addressId}`, 'GET'); },
        getAddressesByCustomerId: (do_next_func, customerId) => { exchangeDataWithAjax(do_next_func, "addressesByCustomerId", `${baseUrl}customers/${customerId}/addresses`, 'GET'); },

        postEmployee: (do_next_func, data) => { exchangeDataWithAjax(do_next_func, "postEmployee", `${baseUrl}employees`, 'POST', data); },
        postCustomer: (do_next_func, data) => { exchangeDataWithAjax(do_next_func, "postCustomer", `${baseUrl}customers`, 'POST', data); },
        postAddress: (do_next_func, customerId, data) => { exchangeDataWithAjax(do_next_func, "postAddress", `${baseUrl}customers/${customerId}/addresses`, 'POST', data); },

        putEmployeeById: (do_next_func, employeeId, data) => { exchangeDataWithAjax(do_next_func, "putEmployeeById", `${baseUrl}employees/${employeeId}`, 'PUT', data); },
        putCustomerById: (do_next_func, customerId, data) => { exchangeDataWithAjax(do_next_func, "putCustomerById", `${baseUrl}customers/${customerId}`, 'PUT', data); },
        putAddressById: (do_next_func, customerId, addressId, data) => { exchangeDataWithAjax(do_next_func, "putAddressById", `${baseUrl}customers/${customerId}/addresses/${addressId}`, 'PUT', data); },

        deleteEmployeeById: (do_next_func, employeeId) => { exchangeDataWithAjax(do_next_func, "deleteEmployeeById", `${baseUrl}employees/${employeeId}`, 'DELETE'); },
        deleteCustomerById: (do_next_func, customerId) => { exchangeDataWithAjax(do_next_func, "deleteCustomerById", `${baseUrl}customers/${customerId}`, 'DELETE'); },
        deleteAddressById: (do_next_func, customerId, addressId) => { exchangeDataWithAjax(do_next_func, "deleteAddressById", `${baseUrl}customers/${customerId}/addresses/${addressId}`, 'DELETE'); }
    };

    // Member variables
    m_data_crud.dataStore = {};
    m_data_crud.finishedWithError = false;
    m_data_crud.error = {};

    const exchangeDataWithAjax = (do_next_func, routeKey, url, method, data = null) => {
        console.log(`${method} Request received, RouteKey: ${routeKey}`);

        m_data_crud.finishedWithError = false;

        function success_func(result) {
            console.log(`${method} was successful! Result:`);
            console.log(result);
            m_data_crud.dataStore[routeKey] = result !== null ? result : {};
            do_next_func();
        }

        function error_func(xhr, status, error) {
            console.error("XHR Error:", xhr);
            m_data_crud.dataStore[routeKey] = {};
            m_data_crud.finishedWithError = true;
            m_data_crud.error.status = status;
            m_data_crud.error.code = xhr.status;
            m_data_crud.error.message = error;
            console.error(error);
            do_next_func();
        }

        const username = "crm";
        const password = "22i-dev_pathxaxs";

        const ajaxConfig = {
            method: method,
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            },
            success: success_func,
            error: error_func
        };

        if (data && (method === "POST" || method === "PUT")) {
            ajaxConfig.contentType = "application/json";
            ajaxConfig.data = JSON.stringify(data);
        }

        $.ajax(ajaxConfig);
    };

    return m_data_crud;
})();
