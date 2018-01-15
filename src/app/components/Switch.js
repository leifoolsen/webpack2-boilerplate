import switchcss from './switch.css';
import randomString from '../../utils/random-string';

/** @jsx h */
import { h } from 'hyperapp';

/**
 * On/off switches toggle the state of a single settings option.
 * The option that the switch controls, as well as the state it’s in, should be
 * made clear from the corresponding inline label. Switches take on the same
 * visual properties of the radio button.
 *
 * @param className
 * @param label
 * @param otherProps
 * @return {*}
 * @constructor
 * @See: https://material.io/guidelines/components/selection-controls.html#selection-controls-switch
 */
const Switch = ({className, value, label, checked, disabled, ...otherProps}) => {

  const {id, key, ...rest} = otherProps;
  const labelClass = disabled ? switchcss.disabled : null;

  /**
   * Initialize component
   * @param {Element} element
   * @param {String} id
   */
  const create = (element, id) => {
    const input = element.querySelector('input');
    input.id = id || `switch-${randomString()}`;
    element.querySelector('label').setAttribute('for', input.id);
  };

  return (
    <div
      key={key}
      class={switchcss.SwitchField}
      oncreate={element => create(element, id)}
    >
      <div class={className || switchcss.Switch}>
        <input
          class={switchcss.Switch__native}
          type="checkbox"
          value={value}
          checked={checked}
          disabled={disabled}
          {...rest}
        />
        <div class={switchcss.Switch__background}>
          <div class={switchcss.Switch__knob} />
        </div>
      </div>
      <label class={labelClass}>{label}</label>
    </div>
  );
};

export default Switch;

