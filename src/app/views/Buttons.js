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
      <button class={button['Button-primary']} type="button">Primary</button>
      <button class={button['Button-secondary']} type="button">Secondary</button>
      <button class={button.Button} type="button" disabled>Disabled</button>
    </div>
    <h2>Stroked Buttons</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button.Button, button['Button-stroked'])} type="button">Button</button>
      <button class={classnames(button['Button-primary'], button['Button-compact'], button['Button-stroked'])} type="button">Compact</button>
      <button class={classnames(button['Button-secondary'], button['Button-stroked'], button['Button-dense'])} type="button">Dense</button>
      <button class={classnames(button['Button-primary'], button['Button-stroked'])} type="button">Primary</button>
      <button class={classnames(button['Button-secondary'], button['Button-stroked'])} type="button">Secondary</button>
      <button class={classnames(button.Button, button['Button-stroked'])} type="button" disabled>Disabled</button>
    </div>
    <h2>Raised Buttons</h2>
    <h2>Unelevated Buttons</h2>
  </div>
;

