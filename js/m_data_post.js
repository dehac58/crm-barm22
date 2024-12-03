var m_data_post = (function () {
    "use strict";
    
    // Application object.
    const m_data_post = {
        postEmployee: (do_next_func) => {exchangeDataWithAjax(do_next_func, "")},

        postCustomer: (do_next_func) => {exchangeDataWithAjax(do_next_func, "")},

        postAddress: (do_next_func) => {exchangeDataWithAjax(do_next_func, "")}
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

            do_next_func();
        };

        $.ajax({
            method: "Post",
            url: url,
            success: success_func,
            error: error_func,
            data: data
        });
    };

    return m_data_post;
})();

