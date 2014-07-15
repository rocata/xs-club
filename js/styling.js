$(document).ready(function () {
    //  CSS:    Menu anchors
    $("div.menu a").hover(
        function () {   //  Handle in ( mouse in )
            $(this).css("text-decoration", "underline");
        },
        function () {   //  Handle out ( mouse out )
            $(this).css("text-decoration", "none");
        }
    );


});