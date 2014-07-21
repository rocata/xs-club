$(function() {

    var newHash = "",
        $mainContent = $("#main_content"),
        $pageWrap = $("#wrapper"),
        baseHeight = 0,
        $el;

    $pageWrap.height($pageWrap.height());
    baseHeight = $pageWrap.height() - $mainContent.height();

    $("nav.navbar").delegate("a", "click", function() {
        window.location.hash = $(this).attr("href");
        return false;
    });

    $(window).bind('hashchange', function() {

        newHash = window.location.hash.substring(1);
        console.log(newHash);

        if (newHash) { console.log('JA');
            $mainContent
                
                .fadeOut(200, function() {
                    $mainContent.hide().load(newHash + " #main_content", function() {
                        $mainContent.fadeIn(200, function() {
                            console.log('done');
                        });
                        console.log('the ' + newHash);
                        $("nav li").removeClass("active");

                        $("nav a[href='" + newHash + "']").parent().addClass("active");
                    });
                });
        };

    });

    $(window).trigger('hashchange');

});