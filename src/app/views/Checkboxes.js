import checkbox from '../../app/components/checkbox.css';

/** @jsx h */
import { h } from 'hyperapp';
import CheckboxSet from '../components/CheckboxSet'; // eslint-disable-line no-unused-vars
import Checkbox from '../components/Checkbox'; // eslint-disable-line no-unused-vars
import classnames from '../../utils/classnames';

export const Checkboxes = () =>
  <div>
    <h1>Checkboxes</h1>
    <p>Checkboxes allow the user to select multiple options from a set.</p>
    <h3>CSS only</h3>
    <h4>Default</h4>
    <br/>
    <div class={checkbox.CheckboxSet}>
      <div class={checkbox.CheckboxField}>
        <div class={checkbox.Checkbox}>
          <input class={checkbox.Checkbox__native} id="cb-d1" name="cb-d" type="checkbox" value="cb-1"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-d1">Checkbox 1</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.Checkbox}>
          <input class={checkbox.Checkbox__native} id="cb-d2" name="cb-d" type="checkbox" value="cb-2"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-d2">Checkbox 2</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.Checkbox}>
          <input class={checkbox.Checkbox__native} id="cb-d3" name="cb-d" type="checkbox" value="cb-3"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-d3">Checkbox 3</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.Checkbox}>
          <input class={checkbox.Checkbox__native} id="cd-d4" name="cb-d" type="checkbox" value="cb-4" checked disabled/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-d4">Disabled</label>
      </div>
    </div>

    <h4>Primary</h4>
    <br/>
    <div class={checkbox.CheckboxSet}>
      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxPrimary}>
          <input class={checkbox.Checkbox__native} id="cb-p1" name="cb-p" type="checkbox" value="cb-1"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-p1">Checkbox 1</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxPrimary}>
          <input class={checkbox.Checkbox__native} id="cb-p2" name="cb-p" type="checkbox" value="cb-2"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-p2">Checkbox 2</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxPrimary}>
          <input class={checkbox.Checkbox__native} id="cb-p3" name="cb-p" type="checkbox" value="cb-3"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-p3">Checkbox 3</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxPrimary}>
          <input class={checkbox.Checkbox__native} id="cd-p4" name="cb-p" type="checkbox" value="cb-4" checked disabled/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-p4">Disabled</label>
      </div>
    </div>

    <h4>Secondary</h4>
    <br/>
    <div class={checkbox.CheckboxSet}>
      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxSecondary}>
          <input class={checkbox.Checkbox__native} id="cb-s1" name="cb-s" type="checkbox" value="cb-1"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-s1">Checkbox 1</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxSecondary}>
          <input class={checkbox.Checkbox__native} id="cb-s2" name="cb-s" type="checkbox" value="cb-2"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-s2">Checkbox 2</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxSecondary}>
          <input class={checkbox.Checkbox__native} id="cb-s3" name="cb-s" type="checkbox" value="cb-3"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-s3">Checkbox 3</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxSecondary}>
          <input class={checkbox.Checkbox__native} id="cd-s4" name="cb-s" type="checkbox" value="cb-4" disabled/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-s4">Disabled</label>
      </div>
    </div>

    <h4>Column (vertical) layout</h4>
    <br/>
    <div class={classnames(checkbox.CheckboxSet, checkbox['CheckboxSet--column'])}>
      <div class={checkbox.CheckboxField}>
        <div class={checkbox.Checkbox}>
          <input class={checkbox.Checkbox__native} id="cb-v1" name="cb-v" type="checkbox" value="cb-1"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-v1">Default</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxPrimary}>
          <input class={checkbox.Checkbox__native} id="cb-v2" name="cb-v" type="checkbox" value="cb-2"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-v2">Primary</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxSecondary}>
          <input class={checkbox.Checkbox__native} id="cb-v3" name="cb-v" type="checkbox" value="cb-3"/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-v3">Secondary</label>
      </div>

      <div class={checkbox.CheckboxField}>
        <div class={checkbox.CheckboxSecondary}>
          <input class={checkbox.Checkbox__native} id="cd-v4" name="cb-v" type="checkbox" value="cb-4" checked disabled/>
          <div class={checkbox.Checkbox__background}>
            <div class={checkbox.Checkbox__box} />
            <div class={checkbox.Checkbox__checkmark} />
          </div>
        </div>
        <label for="cb-v4">Disabled</label>
      </div>
    </div>

    <h3>&lt;Checkbox&gt; component</h3>
    <br/>
    <Checkbox name="cb-c" value="default" label="Default"/>
    <Checkbox className={checkbox.CheckboxPrimary} name="cb-c" value="primary" label="Primary"/>
    <Checkbox className={checkbox.CheckboxSecondary} name="cb-c" value="secondary" label="Secondary" checked/>
    <Checkbox name="cb-c" value="disabled" label="Disabled checkbox component" disabled />

    <h3>&lt;CheckboxSet&gt; component</h3>
    <br/>
    <CheckboxSet
      name="cb-component"
      checkboxes={[
        {value: 'default', label: 'Default'},
        {value: 'primary', label: 'Primary', className: checkbox.CheckboxPrimary},
        {value: 'secondary', label: 'Secondary', className: checkbox.CheckboxSecondary},
        {value: 'disabled', label: 'Disabled checkbox component', checked: true, disabled: true},
      ]}
    />

    <br/>
    <blockquote>
      <p>
        I'm just a tick in a box on a questionnaire<br/>
        Another moment that flashes into nowhere<br/>
        A brand name on a pill that get's you there
      </p>
      <p><cite>Empty Lives, Graham Parker & The Rumour</cite></p>
    </blockquote>

  </div>;
