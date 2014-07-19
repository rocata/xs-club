(  
    /*
    *   This runs when the script is loaded
    */
    function () {
        //  ==============================================
        //  Override onClick events for TOP-NAVBAR anchors    
        //  ==============================================
        $("div.navbar-fixed-top a").each(function () {
            $(this).click(function () {
                var req_url = $(this).attr("href");

                var response = $.ajax(req_url, { "async": false });
                var text = response.responseText;

                $("body").html(text);
                return false;
            });
        });

    } 
    



)

