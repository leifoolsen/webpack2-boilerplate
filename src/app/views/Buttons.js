import {h} from 'hyperapp';
/** @jsx h */

import classnames from '../../utils/classnames';
import button from '../../app/components/button.css';

export const Buttons = () =>
  <div>
    <h1>Buttons</h1>
    <h3>Text Buttons</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={button.Button} type="button">Button</button>
      <button class={classnames(button.Button, button['Button--compact'])} type="button">Compact</button>
      <button class={classnames(button.Button, button['Button--dense'])} type="button">Dense</button>
      <button class={button['Button-primary']} type="button">Primary</button>
      <button class={button['Button-secondary']} type="button">Secondary</button>
      <button class={button.Button} type="button" disabled>Disabled</button>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={button['Button-info']} type="button">Info</button>
      <button class={button['Button-success']} type="button">Success</button>
      <button class={button['Button-warning']} type="button">Warning</button>
      <button class={button['Button-error']} type="button">Error</button>
    </div>
    <h3>Stroked Buttons</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button.Button, button['Button--stroked'])} type="button">Button</button>
      <button class={classnames(button['Button-primary'], button['Button--compact'], button['Button--stroked'])} type="button">Compact</button>
      <button class={classnames(button['Button-secondary'], button['Button--stroked'], button['Button--dense'])} type="button">Dense</button>
      <button class={classnames(button['Button-primary'], button['Button--stroked'])} type="button">Primary</button>
      <button class={classnames(button['Button-secondary'], button['Button--stroked'])} type="button">Secondary</button>
      <button class={classnames(button.Button, button['Button--stroked'])} type="button" disabled>Disabled</button>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button['Button-info'], button['Button--stroked'])} type="button">Info</button>
      <button class={classnames(button['Button-success'], button['Button--stroked'])} type="button">Success</button>
      <button class={classnames(button['Button-warning'], button['Button--stroked'])} type="button">Warning</button>
      <button class={classnames(button['Button-error'], button['Button--stroked'])} type="button">Error</button>
    </div>
    <h3>Unelevated Buttons</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button.Button, button['Button--raised'])} type="button">Button</button>
      <button class={classnames(button['Button'], button['Button--raised'], button['Button--compact'])} type="button">Compact</button>
      <button class={classnames(button['Button-primary'], button['Button--raised'], button['Button--dense'])} type="button">Dense</button>
      <button class={classnames(button['Button-primary'], button['Button--raised'])} type="button">Primary</button>
      <button class={classnames(button['Button-secondary'], button['Button--raised'])} type="button">Secondary</button>
      <button class={classnames(button.Button, button['Button--raised'])} type="button" disabled>Disabled</button>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button['Button-info'], button['Button--raised'])} type="button">Info</button>
      <button class={classnames(button['Button-success'], button['Button--raised'])} type="button">Success</button>
      <button class={classnames(button['Button-warning'], button['Button--raised'])} type="button">Warning</button>
      <button class={classnames(button['Button-error'], button['Button--raised'])} type="button">Error</button>
    </div>
    <h3>Raised Buttons</h3>
  </div>
;

