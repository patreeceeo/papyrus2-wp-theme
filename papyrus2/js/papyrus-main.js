

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
          $("#page-landing .js-slider").xySlider().xySlider("stop");
          $("#page-contact").removeClass("p-slider--down");
        }, 500);
        break;
      default:
        $("#page-contact").addClass("p-slider--down");
        // In the future, there should be an API for turning off the slider,
        // but for now simply hiding the parent element will suffice.
        $("#page-landing").show();

        var $slider = $("#page-landing .js-slider");
        if($slider.is(":visible")) {
          $slider.xySlider().xySlider("start");
        } else {
          $slider.xySlider().xySlider("stop");
        }

        $(window).resize(function () {
          if($slider.is(":visible")) {
            $slider.xySlider().xySlider("start");
          }
        });

        setTimeout(function () {
          $("#page-landing").removeClass("p-slider--up");
        }, 500);
    }
  };

  $(window).hashchange(showPageForHash);
  showPageForHash();

  $.fn.fitText = function (options) {
    var parent, 
        parentWidth, 
        newFontSize, 
        formerFontSize, 
        ratio, 
        maxSize;

    function cssInt (element, propName) {
      return parseInt($(element).css(propName)) || 0;
    }

    options = options || {};
    $(this).each(function () {
      maxSize = parseInt(options.maxSize) || Number.POSITIVE_INFINITY; 
      formerFontSize = cssInt(this, "font-size");
     
      if(options.maxSize === "initial") {
        if($(this).data("fit-text-max-size") == null) {
          maxSize = formerFontSize;
          $(this).data("fit-text-max-size", maxSize);
        } else {
          maxSize = $(this).data("fit-text-max-size");
        }
      }


      $(this).css({
        "font-size": "",
        "line-height": ""
      });

      parent = $(this).parent().get(0);


      parentWidth = Math.min(
        ($(parent).innerWidth() || Number.POSITIVE_INFINITY), 
        $(window).width()
        ) - cssInt(parent, "padding-left") - 
            cssInt(parent, "padding-right") - 
            cssInt(this, "padding-left") -
            cssInt(this, "padding-right");

      if(parentWidth !== $(this).data("fit-text-parent-former-width")) {
        $(this).css({
          "position": "absolute"
        });
        ratio = parentWidth / $(this).innerWidth();
        newFontSize = Math.min(
            maxSize, 
            Math.floor(cssInt(this, "font-size") * ratio * 1)
        );
        $(this).data("fit-text-parent-former-width", parentWidth);
      } else {
        newFontSize = formerFontSize;
      }

      $(this).css({
        "position": "static",
        "font-size": newFontSize + "px",
        "line-height": newFontSize + "px"
      });
    });
  };

  $(".js-fit-text").fitText();

  $(window).resize(debounce(function () {
    $(".js-fit-text").fitText();
  }));

});
