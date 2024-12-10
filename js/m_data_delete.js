var m_data_delete = (function () {
    "use strict";
    
    // Application object.
    const baseUrl = "https://dev.wappprojects.de/wiws22i/"
    const m_data_delete = {
        deleteEmployeeById: (do_next_func, employeeId) => {exchangeDataWithAjax(do_next_func, `${baseUrl}employees/${employeeId}`)},

        deleteCustomerById: (do_next_func, customerId) => {exchangeDataWithAjax(do_next_func, `${baseUrl}customers/${customerId}`)},

        deleteAddressById: (do_next_func, customerId, addressId) => {exchangeDataWithAjax(do_next_func, `${baseUrl}customers/${customerId}/addresses/${addressId}`)},

    };

    //************************************************
    // member variables

	m_data_delete.data = null;
    m_data_delete.finishedWithError = false;
    m_data_delete.error = {};
	

    //************************************************
    // get json data with ajax

	const exchangeDataWithAjax = (do_next_func, url) => {


        function success_func (result) {
           if (result !== null) {
                m_data_delete.data = result;
            } else {
                m_data_delete.data = {};
            }

            do_next_func();

        };

        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            m_data_delete.data = {};
            m_data_delete.finishedWithError = true;
            m_data_delete.error.status = status;
            m_data_delete.error.code = xhr.status;
            m_data_delete.error.message = error;

            do_next_func();
        };

        const username = "crm";
        const password = "22i-dev_pathxaxs"

        $.ajax({
            method: "DELETE",
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            },
            success: success_func,
            error: error_func,
        });
    };

    return m_data_delete;
})();