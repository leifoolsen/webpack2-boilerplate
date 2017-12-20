import { CounterBar, CounterDisplay } from './counter.css';
import button from './button.css';

import { h } from 'hyperapp';
import classnames from '../../utils/classnames';
/** @jsx h */

/**
 * first object in the store is 'state' (an object - {})
 * second object in the store is 'actions' (an object - {})
 * here we destructure what is needed
 * 'num' from 'state' and 'add'/'sub' from 'actions'
 *
 * Based on code from: https://github.com/selfup/hyperapp-one
 */
export const Counter = ({ num,  add, sub }) =>
  <section>
    <h3>Counter example</h3>
    <div class={CounterBar}>
      <button
        class={classnames(button['Button-secondary'], button['Button--raised'], button['Button--filled'], button['Button--icon-l'])}
        type="button"
        aria-label="Subtract"
        onclick={sub}
        disabled={num < 1}
      >
        <i aria-hidden="true" class="material-icons">remove</i>
      </button>

      <div class={CounterDisplay}>
        {num}
      </div>

      <button
        class={classnames(button['Button-primary'], button['Button--raised'], button['Button--filled'], button['Button--icon-l'])}
        type="button"
        aria-label="Add"
        onclick={add}
      >
        <i aria-hidden="true" class="material-icons">add</i>
      </button>

    </div>
  </section>
;
