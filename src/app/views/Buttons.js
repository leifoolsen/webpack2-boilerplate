import {h} from 'hyperapp';
/** @jsx h */

import classnames from '../../utils/classnames';
import button from '../../app/components/button.css';

export const Buttons = () =>
  <div>
    <h1>Buttons</h1>
    <h2>Text Buttons</h2>
    <br />
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={button.Button} type="button">Button</button>
      <button class={classnames(button.Button, button['Button-compact'])} type="button">Compact</button>
      <button class={classnames(button.Button, button['Button-dense'])} type="button">Dense</button>
      <button class={button['Button-secondary']} type="button">Secondary</button>
      <button class={button.Button} type="button" disabled>Disabled</button>
    </div>
    <h2>Raised Buttons</h2>
    <h2>Unelevated Buttons</h2>
    <h2>Stroked Buttons</h2>
  </div>
;

