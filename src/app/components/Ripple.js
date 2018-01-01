import ripple from './ripple.css';

/** @jsx h */
import { h } from 'hyperapp';

/**
 * Determine ig rgb color is dark tone
 * @param {Array} rgb
 * @return {boolean} true if rgb color is dark, otherwise false
 */
const isDark = (rgb) => Math.round((
  rgb[0] * 299 +
  rgb[1] * 587 +
  rgb[2] * 114) / 1000) <= 140;

/**
 * Find the closest element with a background color
 * @param element
 * @return {Array<Number>} rgb(a) color of the matching element. Null if no matching element.
 */
const closestBackgroundColor = element => {

  let el = element;

  while (el) {
    const cs = window.getComputedStyle(el);
    const bgColor = cs.getPropertyValue('background-color');
    if (bgColor) {
      const rgba = bgColor.match(/\d+/g);
      if(rgba.length === 3 || (rgba.length === 4 && rgba[3] > 0)) {
        return rgba;
      }
    }
    if(el === document.body) {
      break;
    }
    el = el.parentNode;
  }
  return null;
};

/**
 * Get ink background color
 * @param element
 * @return {string}
 */
const inkBackgroundColor = element => {
  const rgba = closestBackgroundColor(element);
  if (rgba) {
    if(isDark(rgba)) {
      return 'rgba(255, 255, 255, 0.3)';
    }
  }
  return 'rgba(0, 0, 0, 0.2)';
};

/**
 * Component to provide components, or any element with layout, with a material
 * “ink ripple” interaction effect.
 *
 * @return {*}
 * @constructor
 * @see https://codepen.io/pixelass/post/material-design-ripple
 * @see https://tympanus.net/codrops/2015/09/14/creating-material-design-ripple-effects-svg/
 */
const Ripple = () => {
  let mousePressed = false;
  let animating = false;
  let ink = null;

  /**
   * Fires when mouse button is released
   */
  const mouseUp = () => {
    mousePressed = false;
    if (!animating) {
      removeInk(ink);
    }
  };

  /**
   * Fires when a given animation ends
   */
  const animationEnd = () => {
    animating = false;
    if (!mousePressed) {
      removeInk();
    }
  };

  /**
   * Remove a ripple from a clicked area
   */
  const removeInk = () => {
    if (ink) {
      ink.removeEventListener('animationend', animationEnd);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('touchend', mouseUp);
      ink.remove();
    }
    mousePressed = false;
    animating = false;
    ink = null;
  };

  /**
   * Append a ink to a clicked area
   * Fires when mouse button is pressed
   * @param {Event} event       The event that triggered the action
   * @param {Element} element   The element that should apply the ink and trigger the ripple
   * @param {String} inkBgColor
   */
  const appendInk = (event, element, inkBgColor) => {

    if (animating) {
      return;
    }

    // Remove old ink, if present
    removeInk();

    const rect = element.parentNode.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // event.layerX and event.layerY are deprecated
    let layerX;
    let layerY;

    if(event.target === element.parentNode) {
      layerX = event.offsetX || (event.touches !== undefined ? event.touches[0].offsetX : 0);
      layerY = event.offsetY || (event.touches !== undefined ? event.touches[0].offsetY : 0);
    }
    else {
      layerX = Math.floor(
        ((event.clientX || (event.touches !== undefined ? event.touches[0].clientX : 0))
          - rect.left) / (rect.right - rect.left ) * w
      );
      layerY = Math.floor(
        ((event.clientY || (event.touches !== undefined ? event.touches[0].clientY : 0))
          - rect.top) / (rect.bottom - rect.top ) * h
      );
    }

    const deltaX = w / 2 + Math.abs(w / 2 - layerX);
    const deltaY = h / 2 + Math.abs(h / 2 - layerY);

    // Calculate size
    const size = Math.sqrt(Math.pow(deltaX, 2)
      + Math.pow(deltaY, 2)
      - 2 * deltaX * deltaY * Math.cos(90 / 180 * Math.PI)) * 2;

    // Create a new ink element
    ink = document.createElement('div');
    ink.addEventListener('animationend', animationEnd);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('touchend', mouseUp);
    ink.classList.add(ripple.ink);
    ink.setAttribute('style',
      `left: ${layerX}px; top: ${layerY}px; height: ${size}px; width: ${size}px; background-color: ${inkBgColor}`);

    // Append it to the element that should trigger the ripple
    element.appendChild(ink);
    mousePressed = true;
    animating = true;
  };

  /**
   * Initialize component
   * @param {Element} element
   */
  const create = element => {

    // Determine ink background color
    const inkBgColor = inkBackgroundColor(element.parentNode);

    /*
     * According to spec, a button can not have any interactive content
     * descendants. Clicking an element nested inside a button will not trigger
     * any event (at least not in firefox). To overcome this, the events are
     * attached to the parent element.
     */
    element.parentNode.addEventListener('mousedown', (event) => appendInk(event, element, inkBgColor));
    element.parentNode.addEventListener('touchstart', (event) => appendInk(event, element, inkBgColor));
  };

  return (
    <div
      class={ripple.ripple}
      oncreate={element => create(element)}
    />
  );
};

export default Ripple;
