import checkbox from './checkbox.css';
import randomString from '../../utils/random-string';

/** @jsx h */
import {h} from 'hyperapp';

/**
 * Checkboxes allow the user to select multiple options from a set
 * @param className
 * @param value
 * @param label
 * @param checked
 * @param disabled
 * @param otherProps
 * @return {*}
 * @constructor
 * @see https://material.io/guidelines/components/selection-controls.html#
 */
const Checkbox = ({className, value, label, checked, disabled, ...otherProps}) => {

  const {id, key, ...rest} = otherProps;
  const labelClass = disabled ? checkbox.disabled : null;

  /**
   * Initialize component
   * @param {Element} element
   * @param {String} id
   */
  const create = (element, id) => {
    const input = element.querySelector('input');
    input.id = id || `checkbox-${randomString()}` ;
    element.querySelector('label').setAttribute('for', input.id);
  };

  return (
    <div
      key={key}
      class={checkbox.CheckboxField}
      oncreate={(element) => create(element, id)}
    >
      <div class={className || checkbox.Checkbox}>
        <input
          class={checkbox.Checkbox__native}
          type="checkbox"
          value={value}
          checked={checked}
          disabled={disabled}
          {...rest}
        />
        <div class={checkbox.Checkbox__background}>
          <div class={checkbox.Checkbox__box} />
          <div class={checkbox.Checkbox__checkmark} />
        </div>
      </div>
      <label class={labelClass}>{label}</label>
    </div>
  );
};

export default Checkbox;

