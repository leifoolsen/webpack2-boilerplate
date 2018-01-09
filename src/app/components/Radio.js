import radio from './radio.css';
import randomString from '../../utils/random-string';

/** @jsx h */
import { h } from 'hyperapp';

/**
 * Radio buttons allow the user to select one option from a set.
 * @param className
 * @param label
 * @param otherProps
 * @return {*}
 * @constructor
 * @see https://material.io/guidelines/components/selection-controls.html#
 */
const Radio = ({className, value, label, checked, disabled, ...otherProps}) => {

  const {id, ...rest} = otherProps;
  const labelClass = disabled ? radio.disabled : null;

  /**
   * Initialize component
   * @param {Element} element
   * @param {String} id
   */
  const create = (element, id) => {
    const input = element.querySelector('input');
    input.id = id || `radio.${randomString()}`;
    element.querySelector('label').setAttribute('for', input.id);
  };

  return (
    <div
      class={radio.RadioField}
      oncreate={element => create(element, id)}
    >
      <div class={className || radio.Radio}>
        <input
          class={radio.Radio__native}
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled}
          {...rest}
        />
        <div class={radio.Radio__background}>
          <div class={radio.Radio__outerCircle} />
          <div class={radio.Radio__innerCircle} />
        </div>
      </div>
      <label class={labelClass}>{label}</label>
    </div>
  );
};

export default Radio;

