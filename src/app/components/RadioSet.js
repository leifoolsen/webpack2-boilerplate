import radio from './radio.css';
import randomString from '../../utils/random-string';

/** @jsx h */
import {h} from 'hyperapp';
import Radio from './Radio'; // eslint-disable-line no-unused-vars
import classnames from '../../utils/classnames';

/**
 * Manages a set of radio button options
 * @param name
 * @param column
 * @param radioClass
 * @param options
 * @param otherProps
 * @return {*}
 * @constructor
 */
const RadioSet = ({name, column, radioClass, options, ...otherProps}) => {

  const items = options
    ? options
      .map((item) => {
        const {
          id=`radio-${randomString()}`,
          className,
          value,
          label,
          checked,
          disabled,
          ...rest
        } = item;

        return (
          <Radio
            key={id}
            id={id}
            className={className || radioClass}
            name={name}
            value={value}
            label={label}
            checked={checked}
            disabled={disabled}
            {...rest}
          />
        );
      })
    : null;

  return (
    <div
      class={classnames(
        radio.RadioSet, {
          [radio['RadioSet--column']]: column,
        }
      )}
      {...otherProps}
    >
      {items}
    </div>
  );
};

export default RadioSet;

