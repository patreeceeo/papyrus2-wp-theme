!(function ($) {
  "use strict";

  var Model = function () {
    this.currentSlideIndex = 0;
    this.slideCount = 0;
    this.isSliding = false;
  };

  Model.prototype.showNextSlide = function () {
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex++; 
    this.currentSlideIndex = this.currentSlideIndex % this.slideCount;
  };


  var TransitionView = function (el, beforeCallback) {
    this.$el = $(el || "div");
    this.beforeCallback = beforeCallback;
  };
  TransitionView.prototype._getEndEventName = function () {
    var t;
    var el = document.createElement("fakeelement");
    var transitions = {
      "transition":"transitionend",
      "OTransition":"oTransitionEnd",
      "MozTransition":"transitionend",
      "WebkitTransition":"webkitTransitionEnd"
    };

    for(t in transitions) {
      if( el.style[t] !== undefined ){
        return transitions[t];
      }
    }
  };
  TransitionView.prototype.render = function (callback) {
    var self = this;
    this.beforeCallback(this.$el[0]);
    this.$el.on(this._getEndEventName(), function () {
      self.$el.unbind(self._getEndEventName()); 
      callback && callback.call(this);
    });
  };

  var View = function (options) {
    options = options || {};
    this.$slides = options.$slides;
    this.model = options.model;
    this.model.slideCount = this.$slides.length;
  };
  View.prototype.render = function () {
    var self = this;
    this._applyShowCSS(this._showEl());
    this.$slides.each(function () {
      if(this !== self._showEl()) {
        self._applyResetCSS(this);
      }
      $(this).css({
        "-webkit-transition": "-webkit-transform 0.5s",
        "-moz-transition": "transform 0.5s",
        "-o-transition": "transform 0.5s",
        "transition": "transform 0.5s"
      });
    });
    $(document).on("keypress", function () {
      if(!self.model.isSliding) {
        self.model.showNextSlide(); 
        self.model.isSliding = true;
        self._renderTransitions(function () {
          self.model.isSliding = false;
        });
      }
    });
  };
  View.prototype._showEl = function () {
    return this.$slides[this.model.currentSlideIndex]; 
  };
  View.prototype._hideEl = function () {
    return this.$slides[this.model.previousSlideIndex]; 
  };
  var halfWay = function (el) {
    return (screen.height + $(el).height())/2;
  };
  View.prototype._applyShowCSS = function (el) {
    $(el)
      .css({
        "visibility": "visible",
        "transform": "translateY(0)"
      });
  },
  View.prototype._applyHideCSS = function (el) {
    $(el)
      .css({
        "visibility": "visible",
        "-webkit-transform": "webkit-translateY("+halfWay(el)+"px)",
        "transform": "translateY("+halfWay(el)+"px)"
      });
  };
  View.prototype._applyResetCSS = function (el) {
    $(el)
      .css({
          "visibility": "hidden",
          "-webkit-transform": "-webkit-translateY(-"+halfWay(el)+"px)",
          "transform": "translateY(-"+halfWay(el)+"px)"
      });
  };
  View.prototype._renderTransitions = function (callback) {
    var showTransition, hideTransition, resetTransition;
    showTransition = new TransitionView(this._showEl(), this._applyShowCSS);
    hideTransition = new TransitionView(this._hideEl(), this._applyHideCSS);
    resetTransition = new TransitionView(this._hideEl(), this._applyResetCSS);
    hideTransition.render(function () {
      resetTransition.render();
      showTransition.render(callback);
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
