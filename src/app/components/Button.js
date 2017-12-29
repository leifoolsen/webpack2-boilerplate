import button from './button.css';

/** @jsx h */
import { h } from 'hyperapp';
import classnames from '../../utils/classnames';

const Button = ({ className, compact, dense, filled, stroked, raised, ...otherProps }, children) => {
  const { type='button', ...rest } = otherProps;

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
    </button>
  );
};

export default Button;
