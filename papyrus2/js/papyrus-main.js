

$(function () {
  "use strict";

  var debounce = function (fn) {
    var timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(fn, 1000);
    };
  };

  $.fn.fitText = function () {
    var parentWidth, newFontSize, ratio;
    $(this).each(function (index, element) {
      parentWidth = Math.min($(this).parent().innerWidth() - parseInt($(this).parent().css("padding") || 0), screen.width);
      if(parentWidth !== $(this).data("fit-text-parent-former-width")) {
        $(this).css({
          "position": "absolute"
        });
        ratio = parentWidth / $(this).outerWidth(true);
        newFontSize = Math.floor(parseInt($(this).css("font-size") || 0) * ratio * 1);
        $(this).data("fit-text-original-height", $(this).data("fit-text-original-height") || $(this).height());
        $(this).css({
          "position": "static",
          "font-size": newFontSize + "px",
          "line-height": newFontSize + "px"
        });
        $(this).data("fit-text-parent-former-width", parentWidth);
      }
    });
  };

  $(".js-fit-text").fitText();

  $(window).resize(debounce(function () {
    $(".js-fit-text").fitText();
  }));
});
