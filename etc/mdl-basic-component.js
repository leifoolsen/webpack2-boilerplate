(function() {
  'use strict';

  /**
   * https://github.com/google/material-design-lite/issues/4205
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  const MaterialBasic = function MaterialBasic(element) {
    // Stores the element.
    this.element_ = element;

    console.log('***** ctor', this.element_.classList, 'data-upgraded', this.element_.getAttribute('data-upgraded'));

    // Initialize instance.
    this.init();
  };
  window['MaterialBasic'] = MaterialBasic;

  /**
   * Store constants in one place so they can be updated easily.
   *
   * @enum {string}
   * @private
   */
  MaterialBasic.prototype.Constant_ = {
    RIPPLE_COMPONENT: 'MaterialRipple'
  };

  /**
   * Store strings for class names defined by this component that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   * @private
   */
  MaterialBasic.prototype.CssClasses_ = {
    IS_UPGRADED: 'is-upgraded',
    JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
    JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events'
  };

  /**
   * Initialize component
   */
  MaterialBasic.prototype.init = function() {
    console.log('***** init', this.element_.classList, 'data-upgraded', this.element_.getAttribute('data-upgraded'));

    if (this.element_) {
      if (this.element_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
        this.element_.classList.add(this.CssClasses_.JS_RIPPLE_EFFECT_IGNORE_EVENTS);
      }

      // Do the init required for this component to work

      // Set upgraded flag
      this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
    }
  };

  /**
   * Downgrade component
   * E.g remove listeners and clean up resources
   */
  MaterialBasic.prototype.mdlDowngrade_ = function() {
    'use strict';
  };

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  /* eslint no-undef: 0 */
  /* jshint undef:false */
  componentHandler.register({
    constructor: MaterialBasic,
    classAsString: 'MaterialBasic',
    cssClass: 'mdl-js-basic'
  });
})();
