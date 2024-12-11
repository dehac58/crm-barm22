var m_data_post = (function () {
    "use strict";
    
    // Application object.
    const baseUrl = "https://dev.wappprojects.de/wiws22i/"
    const m_data_post = {
        postEmployee: (do_next_func, data) => {exchangeDataWithAjax(do_next_func, `${baseUrl}employees`, data)},
        postCustomer: (do_next_func, data) => {exchangeDataWithAjax(m_data_get.getCustomers(do_next_func), `${baseUrl}customers`, data)},
        postAddress: (do_next_func, customerId, data) => {exchangeDataWithAjax(do_next_func, `${baseUrl}customers/${customerId}/addresses`, data)}
    };

    //************************************************
    // member variables

	m_data_post.data = null;
    m_data_post.finishedWithError = false;
    m_data_post.error = {};
	

    //************************************************
    // get json data with ajax

	const exchangeDataWithAjax = (do_next_func, url, data) => {

        function success_func (result) {
           if (result !== null) {
                m_data_post.data = result;
            } else {
                m_data_post.data = {};
            }
            do_next_func();
        };

        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            m_data_post.data = {};
            m_data_post.finishedWithError = true;
            m_data_post.error.status = status;
            m_data_post.error.code = xhr.status;
            m_data_post.error.message = error;
            console.log(error)
            do_next_func();
        };

        const username = "crm";
        const password = "22i-dev_pathxaxs"

        $.ajax({
            method: "POST",
            url: url,
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            },
            success: success_func,
            error: error_func,
        });
    };

    return m_data_post;
})();

