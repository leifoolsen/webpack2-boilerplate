import button from './button.css';

/** @jsx h */
import {h} from 'hyperapp';
import Ripple from './Ripple'; // eslint-disable-line no-unused-vars
import classnames from '../../utils/classnames';


const Button = ({className, compact, dense, filled, stroked, raised, ripple, ...otherProps}, children) => {

  const {type='button', ...rest} = otherProps;

  return (
    <button
      class={classnames(
        className, {
          [button['Button--compact']]: compact,
          [button['Button--dense']]: dense,
          [button['Button--filled']]: filled,
          [button['Button--stroked']]: !filled && stroked,
          [button['Button--raised']]: raised,
        })}
      type={type}
      {...rest}
    >
      {children}
      {ripple && <Ripple/>}
    </button>
  );
};

export default Button;
