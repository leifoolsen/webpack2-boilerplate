import { CounterBar, CounterDisplay } from './counter.css';
import button from './button.css';

/** @jsx h */
import { h } from 'hyperapp';
import IconButton from './IconButton'; // eslint-disable-line no-unused-vars

/**
 * first object in the store is 'state' (an object - {})
 * second object in the store is 'actions' (an object - {})
 * here we destructure what is needed
 * 'num' from 'state' and 'add'/'sub' from 'actions'
 *
 * Based on code from: https://github.com/selfup/hyperapp-one
 */
const Counter = ({ num,  add, sub }) =>
  <section>
    <h3>Counter example</h3>
    <br/>
    <div class={CounterBar}>
      <IconButton
        className={button['Button-secondary']}
        size="l"
        raised
        filled
        ripple
        label="Subtract"
        onclick={sub}
        disabled={num < 1}
      >
        <i aria-hidden="true" class="material-icons">remove</i>
      </IconButton>

      <div class={CounterDisplay}>
        {num}
      </div>

      <IconButton
        className={button['Button-primary']}
        size="l"
        raised
        filled
        ripple
        label="Add"
        onclick={add}
      >
        <i aria-hidden="true" class="material-icons">add</i>
      </IconButton>
    </div>
  </section>
;

export default Counter;
