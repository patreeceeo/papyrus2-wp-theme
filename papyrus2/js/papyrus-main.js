

$(function () {
  "use strict";

  var debounce = function (fn) {
    var timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(fn, 1000);
    };
  };

  var showPageForHash = function () {
    switch(location.hash) {
      case "#contact":
        $("#page-landing").addClass("p-slider--up");
        setTimeout(function () {
          // In the future, there should be an API for turning off the slider,
          // but for now simply hiding the parent element will suffice.
          $("#page-landing").hide();
          $("#page-contact").removeClass("p-slider--down");
        }, 500);
        break;
      default:
        $("#page-contact").addClass("p-slider--down");
        // In the future, there should be an API for turning off the slider,
        // but for now simply hiding the parent element will suffice.
        $("#page-landing").show();
        setTimeout(function () {
          $("#page-landing").removeClass("p-slider--up");
        }, 500);
    }
  };

  $(window).hashchange(showPageForHash);
  showPageForHash();

  $.fn.fitText = function () {
    var parentWidth, newFontSize, ratio;
    $(this).each(function () {
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
