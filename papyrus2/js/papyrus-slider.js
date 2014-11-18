!(function ($) {
  "use strict";

  var pluginName = "xySlider";

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
    // bind `this` for _keyupHandler:
    this._keyupHandler = (function (self) {
      var method = self._keyupHandler;
      return function () {
        method.apply(self, arguments); 
      };
    })(this);
    this._slideCompleteHandler = options.slideComplete;
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
    var self = this;
    this.$slides.each(function () {
      var prepTransition = new TransitionView(this, {
        duration: 0,
        translateY: -50,
        translateX: 0,
        visible: false
      });
      prepTransition.render();
    });

    this._slideInterval = setInterval(function () {
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
          self._slideCompleteHandler();
          self.model.isSliding = false;
        });
      }
    }, 4000);

    $(document).on("keyup", this._keyupHandler);
  };
  View.prototype.remove = function () {
    clearInterval(this._slideInterval);
    $(document).unbind("keyup", this._keyupHandler);
  };
  View.prototype._keyupHandler = function (e) {
    var keyCode, keyName;
    keyCode = e.keyCode || e.which;
    if(!this.model.isSliding) {
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
      if(this.transitionMap[keyName] != null) {
        // Okay, you want to be in control of the sliding
        clearInterval(this._slideInterval);
        this.model.isSliding = true;
        if(keyName == "left" || keyName == "up") {
          this.model.showPrevSlide();
        } else {
          this.model.showNextSlide();
        }
        this._renderTransitions(this.transitionMap[keyName], function () {
          this._slideCompleteHandler();
          this.model.isSliding = false;
        });
      }
    }
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

     
  var defaults = {};

	function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
	}

  $.extend(Plugin.prototype, {
    init: function () {
      var $slides;
      $slides = $(this.element).children();

      this.model = new Model();

      this.view = new View({
        $slides: $slides,
        model: this.model,
        slideComplete: this.settings.slideComplete
      });
      this._started = false;
    },
    start: function () {
      $("html").css({"overflow": "hidden"});
      if(this.view != null && this._started === false) {
        this.view.render();
        this._started = true;
      }
    },
    stop: function () {
      $("html").css({"overflow": ""});
      if(this.view != null) {
        this.view.remove();
        this._started = false;
      }
    },
  });


  $.fn[pluginName] = function (options) {
    this.each(function() {
      var plugin, methodName, methodArgs;

      plugin = $.data( this, "plugin_" + pluginName); 

      if (plugin == null) {
        if(!$.isPlainObject(options || {})) {
          throw new Error(pluginName + 
            ": plugin method can not be called before initialization");
        }

        plugin = new Plugin(this, options);
        $.data(this, "plugin_" + pluginName, plugin);
      } else if(options != null) {
        methodName = options;
        methodArgs = Array.prototype.slice.call(arguments, 1);

        if(!$.isFunction(plugin[methodName])) {
          throw new Error(pluginName + 
            ": \"" + methodName + "\" is not a method of " + pluginName);
        }

        return plugin[methodName].apply(plugin, methodArgs);
      }
    });

    // chain jQuery functions
    return this;
  };
})(this.$);
