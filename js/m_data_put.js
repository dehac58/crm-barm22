var m_data_put = (function () {
    "use strict";
    
    // Application object.
    const m_data_put = {
        putEmployeeById: (do_next_func) => {exchangeDataWithAjax(do_next_func, "")},

        putCustomerById: (do_next_func) => {exchangeDataWithAjax(do_next_func, "")},

        putAddressById: (do_next_func) => {exchangeDataWithAjax(do_next_func, "")},
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

        $.ajax({
            method: "Put",
            url: url,
            success: success_func,
            error: error_func,
        });
    };

    return m_data_put;
})();
m_data_put.init();
