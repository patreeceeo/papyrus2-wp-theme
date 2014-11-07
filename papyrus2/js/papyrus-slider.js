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

  var SlideView = function (options) {
    options = options || {};

    this.showTransition = new TransitionView(
        options.showEl, 
        function (el) { 
          $(el)
            .css("visibility", "visible")
            .css("transform", "translateY(0)"); 
        }
    );
    this.hideTransition = new TransitionView(
        options.hideEl, 
        function (el) { 
          $(el)
            .css("visibility", "visible")
            .css("transform", "translateY("+screen.height+"px)"); 
        }
    );
    this.resetTransition = new TransitionView(
        options.hideEl, 
        function (el) { 
          $(el)
            .css("visibility", "hidden")
            .css("transform", "translateY(-"+screen.height+"px)"); 
        }
    );
  };

  SlideView.prototype.render = function (callback) {
    var self = this;
    this.hideTransition.render(function () {
      self.resetTransition.render();
      self.showTransition.render(callback);
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
    this.$slides.each(function () {
      $(this).addClass("p-transition-slider-Y"); 
    });
    // $(this.$slides.get(this.model.currentSlideIndex)).addClass("p-transition-slider-Y--enter");
    $(document).on("keypress", function () {
      var slideView;
      if(!self.model.isSliding) {
        self.model.showNextSlide(); 
        slideView = new SlideView({
          showEl: self.$slides.get(self.model.currentSlideIndex),
          hideEl: self.$slides.get(self.model.previousSlideIndex)
        });
        self.model.isSliding = true;
        slideView.render(function () {
          self.model.isSliding = false;
        });
      }
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
