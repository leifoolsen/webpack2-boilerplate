import {h} from 'hyperapp';
/** @jsx h */

import classnames from '../../utils/classnames';
import colors from '../styles/base/colors.css';
import button from '../../app/components/button.css';

export const Buttons = () =>
  <div>
    <h1>Buttons</h1>
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
        <i aria-hidden="true" class={classnames('material-icons', colors.warningDark2)}>warning</i><span>Warning</span>
      </button>
      <button class={classnames(button['Button-error'], button['Button--stroked'])} type="button">Error</button>
    </div>
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
        <span>Info</span><i aria-hidden="true" class={classnames('material-icons', colors.infoDark2)}>info_outline</i>
      </button>
      <button class={classnames(button['Button-success'], button['Button--filled'])} type="button">
        <i aria-hidden="true" class={classnames('material-icons', colors.successDark2)}>check</i><span>Success</span>
      </button>
      <button class={classnames(button['Button-warning'], button['Button--filled'])} type="button">
        <i aria-hidden="true" class={classnames('material-icons', colors.warningDark2)}>warning</i><span>Warning</span>
      </button>
      <button class={classnames(button['Button-error'], button['Button--filled'])} type="button">
        <span>Error</span><i aria-hidden="true" class={classnames('material-icons', colors.errorDark2)}>error_outline</i>
      </button>
    </div>
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
        <i aria-hidden="true" class={classnames('material-icons', colors.infoDark2)}>info_outline</i><span>Info</span>
      </button>
      <button class={classnames(button['Button-success'], button['Button--filled'], button['Button--raised'])} type="button">
        <span>Success</span><i aria-hidden="true" class={classnames('material-icons', colors.successDark2)}>check</i>
      </button>
      <button class={classnames(button['Button-warning'], button['Button--filled'], button['Button--raised'])} type="button">
        <span>Warning</span><i aria-hidden="true" class={classnames('material-icons', colors.warningDark2)}>warning</i>
      </button>
      <button class={classnames(button['Button-error'], button['Button--filled'], button['Button--raised'])} type="button">
        <i aria-hidden="true" class={classnames('material-icons', colors.errorDark2)}>error_outline</i><span>Error</span>
      </button>
    </div>

    <h3>Icon Buttons</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <button
        class={classnames(button['Button-secondary'], button['Button--stroked'], button['Button--dense'], button['Button--icon'])}
        type="button"
        aria-label="Dense"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
      <button
        class={classnames(button['Button-primary'], button['Button--filled'], button['Button--dense'], button['Button--icon'])}
        type="button"
        aria-label="Dense"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button-secondary'], button['Button--raised'], button['Button--filled'], button['Button--dense'], button['Button--icon'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button-primary'], button['Button--filled'], button['Button--dense'], button['Button--icon'])}
        type="button"
        aria-label="Dense"
        disabled
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button-primary'], button['Button--dense'], button['Button--icon'])}
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
        <i aria-hidden="true" class={classnames('material-icons', colors.infoDark2)}>info_outline</i>
      </button>
      <button
        class={classnames(button['Button-success'], button['Button--filled'], button['Button--raised'], button['Button--icon'])}
        type="button"
        aria-label="Success"
      >
        <i aria-hidden="true" class={classnames('material-icons', colors.successDark2)}>check</i>
      </button>
      <button
        class={classnames(button['Button-warning'], button['Button--filled'], button['Button--raised'], button['Button--icon'])}
        type="button"
        aria-label="Warning"
      >
        <i aria-hidden="true" class={classnames('material-icons', colors.warningDark2)}>warning</i>
      </button>
      <button
        class={classnames(button['Button-error'], button['Button--filled'], button['Button--raised'], button['Button--icon'])}
        type="button"
        aria-label="Error"
      >
        <i aria-hidden="true" class={classnames('material-icons', colors.errorDark2)}>error_outline</i>
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
        class={classnames(button['Button-secondary'], button['Button--raised'], button['Button--filled'], button['Button--large'], button['Button--icon'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button-primary'], button['Button--raised'], button['Button--filled'], button['Button--large'], button['Button--icon'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button'], button['Button--large'], button['Button--icon'])}
        type="button"
        aria-label="Menu"
      >
        <i aria-hidden="true" class="material-icons">menu</i>
      </button>
    </div>

    <br/>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <button
        class={classnames(button['Button-secondary'], button['Button--raised'], button['Button--filled'], button['Button--xl'], button['Button--icon'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>

      <button
        class={classnames(button['Button-primary'], button['Button--raised'], button['Button--filled'], button['Button--xl'], button['Button--icon'])}
        type="button"
        aria-label="Secondary"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
      <button
        class={classnames(button['Button-secondary'], button['Button--filled'], button['Button--dense'], button['Button--icon'])}
        type="button"
        aria-label="Dense"
      >
        <i aria-hidden="true" class="material-icons">accessibility</i>
      </button>
    </div>

    <blockquote>
      <p>This is  the end<br/>
        Hold your breath and count to ten</p>
      <p><cite>Skyfall, Adele</cite></p>
    </blockquote>

  </div>
;

