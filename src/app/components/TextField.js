import textfield from './textfield.css';

/** @jsx h */
import { h } from 'hyperapp';
import Ripple from './Ripple'; // eslint-disable-line no-unused-vars
import randomString from '../../utils/random-string';
import classnames from '../../utils/classnames';

/**
 * Text fields allow users to input, edit, and select text.
 * @param id
 * @param key
 * @param value
 * @param type
 * @param placeholder
 * @param required
 * @param disabled
 * @param label
 * @param floatingLabel
 * @param stroked
 * @param title
 * @param invalid
 * @param ripple
 * @param raised
 * @param style
 * @param otherProps
 * @return {*}
 * @constructor
 */
const TextField = ({
  id,
  key,
  value,
  type = 'text',
  placeholder,
  required,
  disabled,
  label,
  floatingLabel,
  stroked,
  title,
  invalid,
  ripple,
  raised,
  style,
  ...otherProps }) => {

  const create = element => {
    const input = element.querySelector('input');
    const label = element.querySelector('label');

    if (label) {
      input.id = id || `textfield-${randomString()}`;
      label.setAttribute('for', input.id);

      if (floatingLabel) {
        if(input !== document.activeElement && input.value.length < 1) {
          label.classList.add(textfield['TextField__label--inline']);
        }

        input.addEventListener('focus', () => {
          label.classList.remove(textfield['TextField__label--inline']);
        });

        input.addEventListener('focusout', (event) => {
          if (event.target.value.length < 1) {
            label.classList.add(textfield['TextField__label--inline']);
          }
        });
      }

      /*
      label.addEventListener('mousedown', (event) => {
        if (document.activeElement === input &&
          !label.classList.contains(textfield['TextField__label--inline'])) {

          event.preventDefault();
          input.focus();
        }
      });
      */
    }
    else if (id) {
      input.id = id;
    }

    element.addEventListener('mousedown', (event) => {
      event.preventDefault();
      input.focus();
    });
  };

  return (
    <div
      key={key}
      class={textfield.TextField}
      style={style}
      oncreate={element => create(element)}
    >
      <input
        class={classnames(
          textfield.TextField__input, {
            [textfield['TextField__outline--padding']]: stroked,
          })}
        type={type}
        value={value}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        title={title}
        aria-invalid={invalid}
        {...otherProps}
      />
      {
        !stroked && <div class={textfield['TextField__bottom-line']} />
      }

      {
        !stroked && <label
          class={textfield.TextField__label}
          title={title}
        >
          {label}
        </label>
      }

      {
        stroked && <div class={classnames(
          textfield['TextField__outline'], {
            [textfield['raised']]: raised,
          })}>
          <div class={textfield['TextField__outline__top']}>
            <label
              class={classnames(
                textfield.TextField__outline__label, {
                  [textfield['TextField__outline--padding']]: stroked,
                })}
              title={title}
            >
              {label}
            </label>
          </div>
        </div>
      }
      {ripple && <Ripple/>}
    </div>
  );
};

export default TextField;

