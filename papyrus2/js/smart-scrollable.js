!(function ($) {
  "use strict";
  $(function () {
    $(".js-smart-scrollable").each(function () {
      if($(window).innerHeight() >= $(this).innerHeight() || $(this).css("position") !== "static") {
        $("html").css("overflow-y", "hidden");
      }
    });
  });
})(this.$);
