var m_data_put = (function () {
    "use strict";
    
    // Application object.
    const baseUrl = "https://dev.wappprojects.de/wiws22i/"
    const m_data_put = {
        putEmployeeById: (do_next_func, employeeId, data) => {exchangeDataWithAjax(do_next_func, `${baseUrl}employees/${employeeId}`, data)},
        putCustomerById: (do_next_func, customerId, data) => {exchangeDataWithAjax(do_next_func, `${baseUrl}customers/${customerId}`, data)},
        putAddressById: (do_next_func, customerId, addressId, data) => {exchangeDataWithAjax(do_next_func, `${baseUrl}customers/${customerId}/addresses/${addressId}`, data)},
    };

    //************************************************
    // member variables

	m_data_put.data = null;
    m_data_put.finishedWithError = false;
    m_data_put.error = {};
	

    //************************************************
    // get json data with ajax

	const exchangeDataWithAjax = (do_next_func, url) => {


        function success_func (result) {
           if (result !== null) {
                m_data_put.data = result;
            } else {
                m_data_put.data = {};
            }

            do_next_func();

        };

        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            m_data_put.data = {};
            m_data_put.finishedWithError = true;
            m_data_put.error.status = status;
            m_data_put.error.code = xhr.status;
            m_data_put.error.message = error;

            do_next_func();
        };

        const username = "crm";
        const password = "22i-dev_pathxaxs"

        $.ajax({
            method: "PUT",
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            },
            success: success_func,
            error: error_func,
        });
    };

    return m_data_put;
})();

