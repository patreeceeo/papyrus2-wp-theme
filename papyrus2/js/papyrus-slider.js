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


  var TransitionView = function (el, transition) {
    this.$el = $(el);
    this.duration = transition.duration;
    var maxDistance = Math.max(screen.width, screen.height);
    this.translateX = (transition.translateX * maxDistance) + "px";
    this.translateY = (transition.translateY * maxDistance) + "px";
    this.visible = transition.visible || true;
  };
  TransitionView.prototype.render = function (callback) {
    var duration = this.duration;
    if(this.$el[0] == null) {
      duration = 0;
    }
    this.$el.css({
      "-webkit-transition": "-webkit-transform "+this.duration+"ms, opacity 300ms",
      "-moz-transition": "transform "+this.duration+"ms, opacity 300ms",
      "-o-transition": "transform "+this.duration+"ms, opacity 300ms",
      "transition": "transform "+this.duration+"ms, opacity 300ms"
    });
    this.$el.css({
      "-webkit-transform": "-webkit-translate("+this.translateX+","+this.translateY+")",
      "transform": "translate("+this.translateX+","+this.translateY+")",
      "visibility": this.visible ? "visible" : "hidden"
    });
    setTimeout(callback, this.duration);
  };

  var View = function (options) {
    options = options || {};
    this.$slides = options.$slides;
    this.model = options.model;
    this.model.slideCount = this.$slides.length;
  };

  View.prototype.transitionMap = {
    "down": {
      show: {
        duration: 500,
        translateY: 0,
        translateX: 0
      },
      hide: {
        duration: 500,
        translateY: 1,
        translateX: 0
      },
      reset: {
        duration: 0,
        translateY: -1,
        translateX: 0,
        visible: false
      }
    },
    "up": {
      show: {
        duration: 500,
        translateY: 0,
        translateX: 0
      },
      hide: {
        duration: 500,
        translateY: -1,
        translateX: 0
      },
      reset: {
        duration: 0,
        translateY: 1,
        translateX: 0,
        visible: false
      }
    },
    "right": {
      show: {
        duration: 500,
        translateY: 0,
        translateX: 0
      },
      hide: {
        duration: 500,
        translateY: 0,
        translateX: 1
      },
      reset: {
        duration: 0,
        translateY: 0,
        translateX: -1,
        visible: false
      }
    },
    "left": {
      show: {
        duration: 500,
        translateY: 0,
        translateX: 0
      },
      hide: {
        duration: 500,
        translateY: 0,
        translateX: -1
      },
      reset: {
        duration: 0,
        translateY: 0,
        translateX: 1,
        visible: false
      }
    }
  };
  View.prototype.render = function () {
    var slideInterval, self = this;
    this.$slides.each(function () {
      var prepTransition = new TransitionView(this, {
        duration: 0,
        translateY: -50,
        translateX: 0,
        visible: false
      });
      prepTransition.render();
    });

    slideInterval = setInterval(function () {
      var randomName;
      if(!self.model.isSliding) {
        randomName = ["left", "up", "right", "down"][Math.floor(Math.random() * 4)];
        if(randomName == "left" || randomName == "up") {
          self.model.showPrevSlide();
        } else {
          self.model.showNextSlide();
        }
        self.model.isSliding = true;
        self._renderTransitions(self.transitionMap[randomName], function () {
          self.model.isSliding = false;
        });
      }
    }, 4000);

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
          // Okay, you want to be in control of the sliding
          clearInterval(slideInterval);
          self.model.isSliding = true;
          if(keyName == "left" || keyName == "up") {
            self.model.showPrevSlide();
          } else {
            self.model.showNextSlide();
          }
          self._renderTransitions(self.transitionMap[keyName], function () {
            self.model.isSliding = false;
          });
        }
      }
    });

  };
  View.prototype._showEl = function () {
    return this.$slides[this.model.currentSlideIndex]; 
  };
  View.prototype._hideEl = function () {
    return this.$slides[this.model.previousSlideIndex]; 
  };
  View.prototype._renderTransitions = function (transitionInfo, callback) {
    var prepTransition, showTransition, hideTransition, resetTransition;
    prepTransition = new TransitionView(this._showEl(), transitionInfo.reset);
    showTransition = new TransitionView(this._showEl(), transitionInfo.show);
    hideTransition = new TransitionView(this._hideEl(), transitionInfo.hide);
    resetTransition = new TransitionView(this._hideEl(), transitionInfo.reset);
    prepTransition.render(function () {
      hideTransition.render(function () {
        resetTransition.render(function () {
          showTransition.render(callback);
        });
      });
    });
  };

  $(function () {
    var pluginContainers = $("[data-papyrus-plugin=slider]");

    var configureDocument = function (index, element) {
      if($(element).is(":visible")) {
        $("html").css({"overflow": "hidden"});
      } else {
        $("html").css({"overflow": ""});
      }
    };

    var createSlider = function (index, element) {
      var model, view, $el, $slides;
      if($(element).is(":visible")) {
        $el = $(this);
        $slides = $("[data-papyrus-slider-element=slide]", $el);

        model = new Model();

        view = new View({
          $slides: $slides,
          model: model
        });
        view.render();
      }
    };

    pluginContainers.each(configureDocument);

    $(window).resize(function () {
      pluginContainers.each(configureDocument);
    });

    pluginContainers.each(createSlider);
  });
})(this.$);
