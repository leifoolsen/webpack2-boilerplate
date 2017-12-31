import color from '../styles/base/color.css';
import button from '../../app/components/button.css';
import app from '../styles/app/app.css';

/** @jsx h */
import { h } from 'hyperapp';
import Button from '../components/Button'; // eslint-disable-line no-unused-vars
import IconButton from '../components/IconButton'; // eslint-disable-line no-unused-vars
import Ripple from '../components/Ripple'; // eslint-disable-line no-unused-vars
import classnames from '../../utils/classnames';

const codeSampleButtonElement = `
<button class={classnames(button['Button-primary'], button['Button--filled'])} type="button">
  Primary
  <Ripple/>
</button>`;

const codeSampleButtonComponent = `
<Button className={button['Button-secondary']} filled raised ripple>
  Secondary
</Button>`;

const codeSampleIconButtonComponent = `
<IconButton className={button['Button-success']} label="Icon button with ripple" size="xl" filled raised ripple>
  <i aria-hidden="true" class="material-icons">check</i>
</IconButton>`;

const codeSampleDivElement = `
<div style={{ position: 'relative' }}>
  <p>Touche moi</p>
  <Ripple/>
</div>`;

export const Ripples = () =>
  <div>
    <h1>Ripple</h1>
    <p class={app.ingress}>Ink ripples in Material Design provide components,
      or any element with layout, with a material “ink ripple” interaction effect.
      Ripple in Material Design is defined in the Material Design Guidelines,&nbsp;
      <a href="https://material.io/guidelines/motion/choreography.html#choreography-radial-reaction">
        Radial reaction.
      </a>
    </p>
    <blockquote>
      <p>Radial action is the visual ripple of ink spreading outward from the
        point of input.
        The connection between an input event and on-screen action should be
        visually represented to tie them together. For touch or mouse, this
        occurs at the point of contact. A touch ripple indicates where and when
        a touch occurs and acknowledges that the touch input was received.
        Transitions, or actions triggered by input events, should visually
        connect to input events. Ripple reactions near the epicenter occur
        sooner than reactions further away.
      </p>
    </blockquote>
    <br/>

    <div class={app.democontainer} style={{marginBottom: '2px'}}>
      <div class={app.rippledemo}>
        <h5>&lt;button&gt; element with ripple</h5>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <button class={button['Button-primary']} type="button">
            Primary
            <Ripple/>
          </button>
          <button class={classnames(button['Button-primary'], button['Button--stroked'])} type="button">
            Primary
            <Ripple/>
          </button>
          <button class={classnames(button['Button-primary'], button['Button--filled'])} type="button">
            Primary
            <Ripple/>
          </button>
        </div>
        <pre><small>{codeSampleButtonElement}</small></pre>
      </div>

      <div class={app.rippledemo}>
        <h5>&lt;Button&gt; component with ripple</h5>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Button className={button['Button-secondary']} ripple>
            Secondary
          </Button>
          <Button className={button['Button-secondary']} stroked ripple>
            Secondary
          </Button>
          <Button className={button['Button-secondary']} filled raised ripple>
            Secondary
          </Button>
        </div>
        <pre><small>{codeSampleButtonComponent}</small></pre>
      </div>
      <div class={app.rippledemo}>
        <h5>&lt;IconButton&gt; component with ripple</h5>
        <IconButton className={button['Button-success']} label="Icon button with ripple" size="xl" filled raised ripple>
          <i aria-hidden="true" class="material-icons">check</i>
        </IconButton>
        <pre><small>{codeSampleIconButtonComponent}</small></pre>
      </div>
      <div class={app.rippledemo}>
        <h5>&lt;div&gt; element with ripple</h5>
        <br/>
        <div class={app.democontainer}>
          <div class={classnames(app.colordemo, color.textColorPrimary)} style={{position: 'relative'}}>
            <p class={app.ingress}><b>Touche moi</b></p>
            <Ripple/>
          </div>
          <div class={classnames(app.colordemo, color.primary)} style={{position: 'relative'}}>
            <p class={app.ingress}><b>Touch me</b></p>
            <Ripple/>
          </div>
          <div class={app.colordemo} style={{position: 'relative', backgroundColor: '#000000', color: '#ffffff'}}>
            <p class={app.ingress}><b>Berør meg</b></p>
            <Ripple/>
          </div>
        </div>
        <pre><small>{codeSampleDivElement}</small></pre>
      </div>
    </div>

    <blockquote>
      <p>Ripple in still water<br/>
        When there is no pebble tossed<br/>
        Nor wind to blow</p>
      <p><cite>Ripple, Grateful Dead</cite></p>
    </blockquote>
  </div>
;
