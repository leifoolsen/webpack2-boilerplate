import textfield from './textfield.css';

/** @jsx h */
import { h } from 'hyperapp';
import Ripple from './Ripple'; // eslint-disable-line no-unused-vars
import randomString from '../../utils/random-string';

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
  style,
  ripple,
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

        label.addEventListener('mousedown', () => {
          if (!label.classList.contains(textfield['TextField__label--inline']) && document.activeElement === input) {
            event.preventDefault();
            input.focus();
          }
        });
      }
    }
    else if (id) {
      input.id = id;
    }

    element.addEventListener('click', (event) => {
      if(event.target === element) {
        input.focus();
      }
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
        class={textfield.TextField__input}
        type={type}
        value={value}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        {...otherProps}
      />
      <label class={textfield.TextField__label}>{label}</label>
      <div class={textfield['TextField__bottom-line']} />
      {ripple && <Ripple/>}
    </div>
  );
};

export default TextField;

