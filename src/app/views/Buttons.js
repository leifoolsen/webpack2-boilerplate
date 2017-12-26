import color from '../styles/base/color.css';
import button from '../../app/components/button.css';

/** @jsx h */
import {h} from 'hyperapp';
import classnames from '../../utils/classnames';

const codeSample = `.Large-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  height: calc(var(--base-line-height) * 3);
  padding-top: var(--space-s);
  padding-bottom: var(--space-s);

  & .Button {
    font-size: calc(var(--ms1) * 0.9);
    font-weight: var(--font-weight-bold);
  }
}`;


const textButtons = () =>
  <section>
    <h3>Text Buttons</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={button.Button} type="button">Button</button>
      <button class={classnames(button.Button, button['Button--compact'])} type="button">Compact</button>
      <button class={classnames(button.Button, button['Button--dense'])} type="button">
        <span>Dense</span>
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
      <button class={button['Button-primary']} type="button">Primary</button>
      <button class={button['Button-secondary']} type="button">
        <i aria-hidden="true" class="material-icons">accessibility</i>
        <span>Secondary</span>
      </button>
      <button class={button.Button} type="button" disabled>Disabled</button>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={button['Button-info']} type="button">Info</button>
      <button class={button['Button-success']} type="button">
        <span>Success</span>
        <i aria-hidden="true" class="material-icons">check</i>
      </button>
      <button class={button['Button-warning']} type="button">Warning</button>
      <button class={button['Button-error']} type="button">Error</button>
    </div>
  </section>;

const strokedButtons = () =>
  <section>
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
      <button class={classnames(button['Button-warning'], button['Button--stroked'])} type="button">
        <i aria-hidden="true" class={classnames('material-icons', color.warningDark2)}>warning</i><span>Warning</span>
      </button>
      <button class={classnames(button['Button-error'], button['Button--stroked'])} type="button">Error</button>
    </div>
  </section>
;

const filledButtons = () =>
  <section>
    <h3>Filled Buttons</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button.Button, button['Button--filled'])} type="button">Button</button>
      <button class={classnames(button['Button'], button['Button--filled'], button['Button--compact'])} type="button">Compact</button>
      <button class={classnames(button['Button-primary'], button['Button--filled'], button['Button--dense'])} type="button">Dense</button>
      <button class={classnames(button['Button-primary'], button['Button--filled'])} type="button">Primary</button>
      <button class={classnames(button['Button-secondary'], button['Button--filled'])} type="button">Secondary</button>
      <button class={classnames(button.Button, button['Button--filled'])} type="button" disabled>Disabled</button>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button['Button-info'], button['Button--filled'])} type="button">
        <span>Info</span><i aria-hidden="true" class={classnames('material-icons', color.infoDark2)}>info_outline</i>
      </button>
      <button class={classnames(button['Button-success'], button['Button--filled'])} type="button">
        <i aria-hidden="true" class={classnames('material-icons', color.successDark2)}>check</i><span>Success</span>
      </button>
      <button class={classnames(button['Button-warning'], button['Button--filled'])} type="button">
        <i aria-hidden="true" class={classnames('material-icons', color.warningDark2)}>warning</i><span>Warning</span>
      </button>
      <button class={classnames(button['Button-error'], button['Button--filled'])} type="button">
        <span>Error</span><i aria-hidden="true" class={classnames('material-icons', color.errorDark2)}>error_outline</i>
      </button>
    </div>
  </section>
;

const raisedButtons = () =>
  <section>
    <h3>Raised Buttons</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button.Button, button['Button--filled'], button['Button--raised'])} type="button">Button</button>
      <button class={classnames(button['Button'], button['Button--filled'], button['Button--raised'], button['Button--compact'])} type="button">Compact</button>
      <button class={classnames(button['Button-primary'], button['Button--filled'], button['Button--raised'], button['Button--dense'])} type="button">Dense</button>
      <button class={classnames(button['Button-primary'], button['Button--filled'], button['Button--raised'])} type="button">Primary</button>
      <button class={classnames(button['Button-secondary'], button['Button--filled'], button['Button--raised'])} type="button">Secondary</button>
      <button class={classnames(button.Button, button['Button--filled'], button['Button--raised'])} type="button" disabled>Disabled</button>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button.Button, button['Button--stroked'], button['Button--raised'])} type="button">Button</button>
      <button class={classnames(button['Button-primary'], button['Button--compact'], button['Button--stroked'], button['Button--raised'])} type="button">Compact</button>
      <button class={classnames(button['Button-secondary'], button['Button--stroked'], button['Button--raised'], button['Button--dense'])} type="button">Dense</button>
      <button class={classnames(button['Button-primary'], button['Button--stroked'], button['Button--raised'])} type="button">Primary</button>
      <button class={classnames(button['Button-secondary'], button['Button--stroked'], button['Button--raised'])} type="button">Secondary</button>
      <button class={classnames(button.Button, button['Button--stroked'], button['Button--raised'])} type="button" disabled>Disabled</button>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button.Button, button['Button--raised'])} type="button">Button</button>
      <button class={classnames(button.Button, button['Button--raised'], button['Button--compact'])} type="button">Compact</button>
      <button class={classnames(button.Button, button['Button--raised'], button['Button--dense'])} type="button">Dense</button>
      <button class={classnames(button['Button-primary'], button['Button--raised'])} type="button">Primary</button>
      <button class={classnames(button['Button-secondary'], button['Button--raised'])} type="button">Secondary</button>
      <button class={classnames(button.Button, button['Button--raised'])} type="button" disabled>Disabled</button>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={classnames(button['Button-info'], button['Button--filled'], button['Button--raised'])} type="button">
        <i aria-hidden="true" class={classnames('material-icons', color.infoDark2)}>info_outline</i><span>Info</span>
      </button>
      <button class={classnames(button['Button-success'], button['Button--filled'], button['Button--raised'])} type="button">
        <span>Success</span><i aria-hidden="true" class={classnames('material-icons', color.successDark2)}>check</i>
      </button>
      <button class={classnames(button['Button-warning'], button['Button--filled'], button['Button--raised'])} type="button">
        <span>Warning</span><i aria-hidden="true" class={classnames('material-icons', color.warningDark2)}>warning</i>
      </button>
      <button class={classnames(button['Button-error'], button['Button--filled'], button['Button--raised'])} type="button">
        <i aria-hidden="true" class={classnames('material-icons', color.errorDark2)}>error_outline</i><span>Error</span>
      </button>
    </div>
  </section>
;

const largeButtons = () =>
  <section>
    <h3>Large Buttons</h3>
    <p>You can make the buttons as large (or small) as you want by putting them inside a
      flex container. The buttons does not have a set height; they follow a
      "natural" height governed by the base line height. You can take advantage
      of this by creating a flex container and setting the height to a multiple
      of the base line height and the &nbsp;
      <b><code>align-items</code></b> property to <b><code>stretch</code>.</b>
    </p>
    <pre><small>{codeSample}</small></pre>

    <div class={button['Large-buttons']}>
      <button class={classnames(button['Button-info'], button['Button--filled'], button['Button--raised'])} type="button">
        <i aria-hidden="true" class={classnames('material-icons', color.infoDark2)}>info_outline</i><span>Info</span>
      </button>
      <button class={classnames(button['Button-success'], button['Button--filled'], button['Button--raised'])} type="button">
        <span>Success</span><i aria-hidden="true" class={classnames('material-icons', color.successDark2)}>check</i>
      </button>
    </div>

    <p>The text inside a "large" button will not necessarily rest on the grid line,
      but that's acceptable as long as the button's container has a height that
      is a multiple of the base line height.</p>
  </section>
;

const iconButtons = () =>
  <section>
    <h3>Icon Buttons</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <button
        class={classnames(button['Button-secondary'], button['Button--stroked'], button['Button--icon-s'])}
        type="button"
        aria-label="Dense"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
      <button
        class={classnames(button['Button-primary'], button['Button--filled'], button['Button--icon-s'])}
        type="button"
        aria-label="Dense"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button-secondary'], button['Button--raised'], button['Button--filled'], button['Button--icon-s'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button-primary'], button['Button--filled'], button['Button--icon-s'])}
        type="button"
        aria-label="Dense"
        disabled
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button-primary'], button['Button--icon-s'])}
        type="button"
        aria-label="Dense"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <button
        class={classnames(button['Button-info'], button['Button--filled'], button['Button--raised'], button['Button--icon'])}
        type="button"
        aria-label="Info"
      >
        <i aria-hidden="true" class={classnames('material-icons', color.infoDark2)}>info_outline</i>
      </button>
      <button
        class={classnames(button['Button-success'], button['Button--filled'], button['Button--raised'], button['Button--icon'])}
        type="button"
        aria-label="Success"
      >
        <i aria-hidden="true" class={classnames('material-icons', color.successDark2)}>check</i>
      </button>
      <button
        class={classnames(button['Button-warning'], button['Button--filled'], button['Button--raised'], button['Button--icon'])}
        type="button"
        aria-label="Warning"
      >
        <i aria-hidden="true" class={classnames('material-icons', color.warningDark2)}>warning</i>
      </button>
      <button
        class={classnames(button['Button-error'], button['Button--filled'], button['Button--raised'], button['Button--icon'])}
        type="button"
        aria-label="Error"
      >
        <i aria-hidden="true" class={classnames('material-icons', color.errorDark2)}>error_outline</i>
      </button>
      <button
        class={classnames(button['Button-primary'], button['Button--filled'], button['Button--raised'], button['Button--icon'])}
        type="button"
        aria-label="Primary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
      <button
        class={classnames(button['Button-primary'], button['Button--filled'], button['Button--raised'], button['Button--icon'])}
        type="button"
        aria-label="Primary"
        disabled
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
      <button
        class={classnames(button['Button-secondary'], button['Button--icon'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
    </div>

    <br/>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <button
        class={classnames(button['Button-primary'], button['Button--raised'], button['Button--filled'], button['Button--icon-l'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button-secondary'], button['Button--raised'], button['Button--filled'], button['Button--icon-l'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button'], button['Button--icon-l'])}
        type="button"
        aria-label="Menu"
      >
        <i aria-hidden="true" class="material-icons">menu</i>
      </button>
    </div>

    <br/>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <button
        class={classnames(button['Button-secondary'], button['Button--raised'], button['Button--filled'], button['Button--icon-xl'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button-primary'], button['Button--raised'], button['Button--filled'], button['Button--icon-xl'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <button
        class={classnames(button['Button-secondary'], button['Button--filled'], button['Button--icon-s'])}
        type="button"
        aria-label="Dense"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
    </div>
  </section>
;

export const Buttons = () =>
  <div>
    <h1>Buttons</h1>
    { textButtons() }

    { strokedButtons() }

    <br/>
    { filledButtons() }

    <br/>
    { raisedButtons() }

    <br/>
    { largeButtons() }

    <br/>
    { iconButtons() }

    <blockquote>
      <p>This is the end<br/>
        Hold your breath and count to ten</p>
      <p><cite>Skyfall, Adele</cite></p>
    </blockquote>
  </div>
;

