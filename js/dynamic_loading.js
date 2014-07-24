$(function () {

    var newHash = "",
        $mainContent = $("#main_content"),
        $pageWrap = $("#wrapper"),
        baseHeight = 0,
        $el;

    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();

    $("nav.navbar").delegate("a", "click", function () {
        window.location.hash = $(this).attr("href");
        return false;
    });

    $(window).bind('hashchange', function () {

        newHash = window.location.hash.substring(1);

        if (newHash) {
            //  Hide the collapsed navbar if link is clicked
            if ($("div.navbar-collapse.navHeaderCollapse.collapse.in").length)
                $("nav.navbar-fixed-top button").click();
            $mainContent
                .fadeOut(200, function () {
                    $mainContent.hide().load(newHash + " #main_content", function () {
                        $mainContent.fadeIn(200, function () {
                            // ???
                        });
                        $("nav li").removeClass("active");
                        $("nav a[href='" + newHash + "']").parent().addClass("active");
                    });
                });
        };

    });

    $(window).trigger('hashchange');

});