

$(function () {
  "use strict";

  var debounce = function (fn) {
    var timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(fn, 200);
    };
  };

  var $slider = $("#page-landing .js-slider"),
      slideCount = 0;

  $slider.xySlider({
    slideComplete: function () {
      if(slideCount === 0) {
        $(".js-fade-in-1st-slide-complete").removeClass("p-fader--out");
      }
      slideCount++;
    }
  });
    

  var showPageForHash = function () {
    switch(location.hash) {
      case "#contact":
        $("#page-landing").addClass("p-slider--up");
        setTimeout(function () {
          // In the future, there should be an API for turning off the slider,
          // but for now simply hiding the parent element will suffice.
          $("#page-landing").hide();
          $("#page-landing .js-slider").xySlider("stop");
          $("#page-contact").removeClass("p-slider--down");
        }, 500);
        break;
      default:
        $("#page-contact").addClass("p-slider--down");
        // In the future, there should be an API for turning off the slider,
        // but for now simply hiding the parent element will suffice.
        $("#page-landing").show();

        if($slider.is(":visible")) {
          $slider.xySlider("start");
        } else {
          $slider.xySlider("stop");
        }

        $(window).resize(function () {
          if($slider.is(":visible")) {
            $slider.xySlider("start");
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

      // When the text element to be dynamically sized is directly inside a block
      // element with an automatically determined width, e.g. a div with no matching CSS
      // width rule or in-line style property, fitText would still use the current width
      // of the parent as the width to fit the text into. In effect, the text
      // would shrink with the parent when the window became narrower than the parent
      // element, but would not grow again because the parent did not grow. The
      // solution, for now, is to remove in-line font-size from the text element before 
      // querying the parent width.
      $(this).css({
        "font-size": "",
        "line-height": ""
      });

      parent = $(this).parent().get(0);

      // fitText should ensure the text doesn't spill into the padding area only
      // if the width being fit into is the window width.
      parentWidth = Math.min(
        ($(parent).innerWidth() || Number.POSITIVE_INFINITY), 
        $(window).width() - cssInt(this, "padding-left") -
                            cssInt(this, "padding-right")
        ) - cssInt(parent, "padding-left") - 
            cssInt(parent, "padding-right");

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
