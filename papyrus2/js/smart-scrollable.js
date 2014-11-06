!(function ($) {
  "use strict";
  $(function () {
    function refresh () {
      $(".js-smart-scrollable").each(function () {
        if($(window).innerHeight() >= $(this).outerHeight(true)) {
          $(this).parent().css("overflow-y", "hidden");
        } else {
          $(this).parent().css("overflow-y", "scroll");
        }
      });
    }

    $(window).resize(refresh);

    refresh();
  });
})(this.$);
