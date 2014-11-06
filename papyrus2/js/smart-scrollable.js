!(function ($) {
  "use strict";
  $(function () {
    function refresh () {
      $(".js-smart-scrollable").each(function () {
        var value = "hidden";
        if($(window).innerHeight() < $(this).outerHeight(true)) {
          value = "scroll";
        }
        if(window.screen.height < $(this).outerHeight(true)) {
          value = "scroll";
        }
        $(this).parent().css("overflow-y", value);
      });
    }

    $(window).resize(refresh);

    refresh();
  });
})(this.$);
