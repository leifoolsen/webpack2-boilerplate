import checkbox from './checkbox.css';
import randomString from '../../utils/random-string';

/** @jsx h */
import { h } from 'hyperapp';
import Checkbox from './Checkbox';
import classnames from '../../utils/classnames';

/**
 * Manages a set of checkboxes
 * @param name
 * @param column
 * @param checkboxes
 * @param otherProps
 * @return {*}
 * @constructor
 */
const CheckboxSet = ({name, column, checkboxes, ...otherProps}) => {

  const items = checkboxes
    ? checkboxes
      .map(item => {
        const {
          id=`checkbox-${randomString()}`,
          className,
          value,
          label,
          checked,
          disabled,
          ...rest
        } = item;

        return (
          <Checkbox
            key={id}
            id={id}
            className={className}
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
        checkbox.CheckboxSet, {
          [checkbox['CheckboxSet--column']]: column,
        }
      )}
      {...otherProps}
    >
      {items}
    </div>
  );
};

export default CheckboxSet;
