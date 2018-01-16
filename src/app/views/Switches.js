import switchcss from '../../app/components/switch.css';

/** @jsx h */
import { h } from 'hyperapp';
import Switch from '../../app/components/Switch'; // eslint-disable-line no-unused-vars

export const Switches = () =>
  <div>
    <h1>Switches</h1>
    <p>
      On/off switches toggle the state of a single settings option.
      The option that the switch controls, as well as the state it’s in, should be
      made clear from the corresponding inline label. Switches take on the same
      visual properties of the radio button.
    </p>
    <h3>CSS only</h3>
    <br/>
    <div class={switchcss.SwitchField}>
      <div class={switchcss.Switch}>
        <input class={switchcss.Switch__native} id="switch-default-on" name="switch" type="checkbox" value="default-on" checked />
        <div class={switchcss.Switch__background}>
          <div class={switchcss.Switch__knob} />
        </div>
      </div>
      <label for="switch-default-on">Default on</label>
    </div>
    <br/>
    <div class={switchcss.SwitchField}>
      <div class={switchcss.Switch}>
        <input class={switchcss.Switch__native} id="switch-default" name="switch" type="checkbox" value="default" />
        <div class={switchcss.Switch__background}>
          <div class={switchcss.Switch__knob} />
        </div>
      </div>
      <label for="switch-default">Default off</label>
    </div>
    <br/>

    <div class={switchcss.SwitchField}>
      <div class={switchcss.SwitchPrimary}>
        <input class={switchcss.Switch__native} id="switch-primary-on" name="switch" type="checkbox" value="primary-on" checked />
        <div class={switchcss.Switch__background}>
          <div class={switchcss.Switch__knob} />
        </div>
      </div>
      <label for="switch-primary-on">Primary on</label>
    </div>
    <br/>
    <div class={switchcss.SwitchField}>
      <div class={switchcss.SwitchPrimary}>
        <input class={switchcss.Switch__native} id="switch-primary" name="switch" type="checkbox" value="primary" />
        <div class={switchcss.Switch__background}>
          <div class={switchcss.Switch__knob} />
        </div>
      </div>
      <label for="switch-primary">Primary off</label>
    </div>
    <br/>

    <div class={switchcss.SwitchField}>
      <div class={switchcss.SwitchSecondary}>
        <input class={switchcss.Switch__native} id="switch-secondary-on" name="switch" type="checkbox" value="secondary-on" checked />
        <div class={switchcss.Switch__background}>
          <div class={switchcss.Switch__knob} />
        </div>
      </div>
      <label for="switch-secondary-on">Secondary on</label>
    </div>
    <br/>
    <div class={switchcss.SwitchField}>
      <div class={switchcss.SwitchSecondary}>
        <input class={switchcss.Switch__native} id="switch-secondary" name="switch" type="checkbox" value="secondary" />
        <div class={switchcss.Switch__background}>
          <div class={switchcss.Switch__knob} />
        </div>
      </div>
      <label for="switch-secondary">Secondary off</label>
    </div>
    <br/>

    <div class={switchcss.SwitchField}>
      <div class={switchcss.Switch}>
        <input class={switchcss.Switch__native} id="switch-disabled-on" name="switch" type="checkbox" value="disabled-on" checked disabled />
        <div class={switchcss.Switch__background}>
          <div class={switchcss.Switch__knob} />
        </div>
      </div>
      <label for="switch-disabled-off">Disabled on</label>
    </div>
    <br/>
    <div class={switchcss.SwitchField}>
      <div class={switchcss.Switch}>
        <input class={switchcss.Switch__native} id="switch-disabled-off" name="switch" type="checkbox" value="disabled-off" disabled />
        <div class={switchcss.Switch__background}>
          <div class={switchcss.Switch__knob} />
        </div>
      </div>
      <label for="switch-disabled-off">Disabled off</label>
    </div>

    <h3>&lt;Switch&gt; component</h3>
    <br/>
    <Switch
      className={switchcss.SwitchPrimary}
      value="switch-component"
      checked
      label="Switch component"
    />
    <br/>
    <Switch
      className={switchcss.SwitchPrimary}
      value="disabled-switch-component"
      disabled
      label="Disabled switch component"
    />

    <br/>
    <blockquote>
      <p>
        Turn it off if you want to<br/>
        Switch it off it will go away<br/>
        Turn it off if you want to<br/>
        Switch it off or look away<br/>
        Switch it off<br/>
        Turn it off<br/>
      </p>
      <p><cite>Long Long Way to Go, Phil Collins</cite></p>
    </blockquote>

  </div>;

