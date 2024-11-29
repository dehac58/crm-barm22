var m_data_delete = (function () {
    "use strict";
    
    // Application object.
    const m_data_delete = {
        deleteEmployeeById: (do_next_func) => {exchangeDataWithAjax(do_next_func, "")},

        deleteCustomerById: (do_next_func) => {exchangeDataWithAjax(do_next_func, "")},

        deleteAddressById: (do_next_func) => {exchangeDataWithAjax(do_next_func, "")},

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

        $.ajax({
            method: "Delete",
            url: url,
            success: success_func,
            error: error_func,
        });
    };

    return m_data_delete;
})();
m_data_delete.init();
