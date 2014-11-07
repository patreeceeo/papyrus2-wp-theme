!(function ($) {
  "use strict";

  var Model = function () {
    this.currentSlideIndex = -1;
    this.slideCount = 0;
    this.isSliding = false;
  };

  Model.prototype.showNextSlide = function () {
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex++; 
    this.currentSlideIndex = this.currentSlideIndex % this.slideCount;
  };

  Model.prototype.showPrevSlide = function () {
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex--; 
    this.currentSlideIndex = this.currentSlideIndex > -1 ? 
      this.currentSlideIndex : this.slideCount - 1;
  };


  var TransitionView = function (el, beforeCallback, duration) {
    this.$el = $(el);
    this.beforeCallback = beforeCallback;
    this.duration = duration || 500;
  };
  TransitionView.prototype.render = function (callback) {
    var duration = this.duration;
    if(this.$el[0] == null) {
      duration = 0;
    }
    this.beforeCallback(this.$el[0]);
    setTimeout(callback, this.duration);
  };

  var View = function (options) {
    options = options || {};
    this.$slides = options.$slides;
    this.model = options.model;
    this.model.slideCount = this.$slides.length;
  };
  View.prototype._applyShowCSS = function (el) {
    $(el)
      .css({
        "visibility": "visible",
        "transform": "translateY(0)"
      });
  };
  View.prototype._applyResetCSS = function (el) {
    $(el)
      .css({
        "visibility": "hidden"
      });
  };
  View.prototype.transitionMap = {
    "down": (function () {
      var halfWay = function (el) {
        return (screen.height + $(el).height())/2;
      };
      return {
        applyShowCSS: View.prototype._applyShowCSS,
        applyHideCSS: function (el) {
          $(el)
            .css({
              "visibility": "visible",
              "-webkit-transform": "webkit-translateY("+halfWay(el)+"px)",
              "transform": "translateY("+halfWay(el)+"px)"
            });
        },
        applyResetCSS: function (el) {
          $(el)
            .css({
                "visibility": "hidden",
                "-webkit-transform": "-webkit-translateY(-"+halfWay(el)+"px)",
                "transform": "translateY(-"+halfWay(el)+"px)"
            });
        }
      };
    })(),
    "up": (function () {
      var halfWay = function (el) {
        return (screen.height + $(el).height())/2;
      };
      return {
        applyShowCSS: View.prototype._applyShowCSS,
        applyHideCSS: function (el) {
          $(el)
            .css({
              "visibility": "visible",
              "-webkit-transform": "webkit-translateY(-"+halfWay(el)+"px)",
              "transform": "translateY(-"+halfWay(el)+"px)"
            });
        },
        applyResetCSS: function (el) {
          $(el)
            .css({
                "visibility": "hidden",
                "-webkit-transform": "-webkit-translateY("+halfWay(el)+"px)",
                "transform": "translateY("+halfWay(el)+"px)"
            });
        }
      };
    })(),
    "left": (function () {
      var halfWay = function (el) {
        return (screen.width/2) + $(el).width();
      };
      return {
        applyShowCSS: View.prototype._applyShowCSS,
        applyHideCSS: function (el) {
          $(el)
            .css({
              "visibility": "visible",
              "-webkit-transform": "webkit-translateX(-"+halfWay(el)+"px)",
              "transform": "translateX(-"+halfWay(el)+"px)"
            });
        },
        applyResetCSS: function (el) {
          $(el)
            .css({
                "visibility": "hidden",
                "-webkit-transform": "-webkit-translateX("+halfWay(el)+"px)",
                "transform": "translateX("+halfWay(el)+"px)"
            });
        }
      };
    })(),
    "right": (function () {
      var halfWay = function (el) {
        return (screen.width/2) + $(el).width();
      };
      return {
        applyShowCSS: View.prototype._applyShowCSS,
        applyHideCSS: function (el) {
          $(el)
            .css({
              "visibility": "visible",
              "-webkit-transform": "webkit-translateX("+halfWay(el)+"px)",
              "transform": "translateX("+halfWay(el)+"px)"
            });
        },
        applyResetCSS: function (el) {
          $(el)
            .css({
                "visibility": "hidden",
                "-webkit-transform": "-webkit-translateX(-"+halfWay(el)+"px)",
                "transform": "translateX(-"+halfWay(el)+"px)"
            });
        }
      };
    })()
  };
  View.prototype.render = function () {
    var self = this;
    this.$slides.each(function () {
      self._applyResetCSS(this);
      $(this).css({
        "-webkit-transition": "-webkit-transform 0.5s",
        "-moz-transition": "transform 0.5s",
        "-o-transition": "transform 0.5s",
        "transition": "transform 0.5s"
      });
    });

    /* global console */ 
    $(document).on("keyup", function (e) {
      var keyCode, keyName;
      keyCode = e.keyCode || e.which;
      if(!self.model.isSliding) {
        switch(keyCode) {
          case 37:
            keyName = "left";
            break;
          case 38:
            keyName = "up";
            break;
          case 39:
            keyName = "right";
            break;
          case 40:
            keyName = "down";
            break;
        }
        if(self.transitionMap[keyName] != null) {
          self.model.isSliding = true;
          console.count("sliding");
          if(keyName == "left" || keyName == "up") {
            self.model.showPrevSlide();
          } else {
            self.model.showNextSlide();
          }
          self._renderTransitions(self.transitionMap[keyName], function () {
            self.model.isSliding = false;
            console.count("not sliding");
          });
        }
      }
    });

    // setInterval(function () {
    //   var randomName;
    //   randomName = ["left", "up", "right", "down"][Math.floor(Math.random() * 4)];
    //   self.model.showNextSlide();
    //   self.model.isSliding = true;
    //   self._renderTransitions(self.transitionMap[randomName], function () {
    //     self.model.isSliding = false;
    //   });
    // }, 4000);
  };
  View.prototype._showEl = function () {
    return this.$slides[this.model.currentSlideIndex]; 
  };
  View.prototype._hideEl = function () {
    return this.$slides[this.model.previousSlideIndex]; 
  };
  View.prototype._renderTransitions = function (transitionInfo, callback) {
    var prepTransition, showTransition, hideTransition, resetTransition;
    prepTransition = new TransitionView(this._showEl(), transitionInfo.applyResetCSS);
    showTransition = new TransitionView(this._showEl(), transitionInfo.applyShowCSS);
    hideTransition = new TransitionView(this._hideEl(), transitionInfo.applyHideCSS);
    resetTransition = new TransitionView(this._hideEl(), transitionInfo.applyResetCSS);
    prepTransition.render(function () {
      hideTransition.render(function () {
        resetTransition.render(function () {
          showTransition.render(callback);
        });
      });
    });
  };

  $(function () {
    $("[data-papyrus-plugin=slider]").each(function () {
      var model, view, $el, $slides;
      $el = $(this);
      $slides = $("[data-papyrus-slider-element=slide]", $el);

      model = new Model();

      view = new View({
        $slides: $slides,
        model: model
      });
      view.render();
    });
  });
})(this.$);
