import radio from '../../app/components/radio.css';

/** @jsx h */
import { h } from 'hyperapp';
import classnames from '../../utils/classnames';

export const RadioButtons = () =>
  <div>
    <h1>Radio Buttons</h1>
    <h3>CSS only</h3>
    <h4>Default</h4>
    <br/>
    <div class={radio.RadioGroup}>
      <div class={radio.RadioField}>
        <div class={radio.Radio}>
          <input class={radio.Radio__native} id="radiod1" name="radio__d" type="radio" value="Radio 1"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiod1">Option 1</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.Radio}>
          <input class={radio.Radio__native} id="radiod2" name="radio__d" type="radio" value="Radio 2"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiod2">Option 2</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.Radio}>
          <input class={radio.Radio__native} id="radiod3" name="radio__d" type="radio" value="Radio 3"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiod3">Option 3</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.Radio}>
          <input class={radio.Radio__native} id="radiod4" name="radio__d" type="radio" value="Radio 4" checked disabled/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiod4">Disabled</label>
      </div>
    </div>

    <h4>Primary</h4>
    <br/>
    <div class={radio.RadioGroup}>
      <div class={radio.RadioField}>
        <div class={radio.RadioPrimary}>
          <input class={radio.Radio__native} id="radiop1" name="radio__p" type="radio" value="Radio 1"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiop1">Option 1</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.RadioPrimary}>
          <input class={radio.Radio__native} id="radiop2" name="radio__p" type="radio" value="Radio 2"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiop2">Option 2</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.RadioPrimary}>
          <input class={radio.Radio__native} id="radiop3" name="radio__p" type="radio" value="Radio 3"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiop3">Option 3</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.RadioPrimary}>
          <input class={radio.Radio__native} id="radiop4" name="radio__p" type="radio" value="Radio 4" checked disabled/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiop4">Disabled</label>
      </div>
    </div>

    <h4>Secondary</h4>
    <br/>
    <div class={radio.RadioGroup}>
      <div class={radio.RadioField}>
        <div class={radio.RadioSecondary}>
          <input class={radio.Radio__native} id="radios1" name="radio__s" type="radio" value="Radio 1"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radios1">Option 1</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.RadioSecondary}>
          <input class={radio.Radio__native} id="radios2" name="radio__s" type="radio" value="Radio 2"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radios2">Option 2</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.RadioSecondary}>
          <input class={radio.Radio__native} id="radios3" name="radio__s" type="radio" value="Radio 3"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radios3">Option 3</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.RadioSecondary}>
          <input class={radio.Radio__native} id="radios4" name="radio__s" type="radio" value="Radio 4" disabled/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiops4">Disabled</label>
      </div>
    </div>

    <h4>Verical layout</h4>
    <br/>
    <div class={classnames(radio.RadioGroup, radio['RadioGroup--vertical'])}>
      <div class={radio.RadioField}>
        <div class={radio.Radio}>
          <input class={radio.Radio__native} id="radiov1" name="radio__v" type="radio" value="default"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiov1">Default color</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.RadioPrimary}>
          <input class={radio.Radio__native} id="radiov2" name="radio__v" type="radio" value="primary"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiov2">Primary color</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.RadioSecondary}>
          <input class={radio.Radio__native} id="radiov3" name="radio__v" type="radio" value="secondary"/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiov3">Secondary color</label>
      </div>

      <div class={radio.RadioField}>
        <div class={radio.Radio}>
          <input class={radio.Radio__native} id="radiov4" name="radio__v" type="radio" value="foobar" checked disabled/>
          <div class={radio.Radio__background}>
            <div class={radio.Radio__outerCircle} />
            <div class={radio.Radio__innerCircle} />
          </div>
        </div>
        <label for="radiov4">Disabled</label>
      </div>
    </div>

    <br/>
    <blockquote>
      <p>
        Oh honey you turn me on<br/>
        I'm a radio<br/>
        I'm a country station<br/>
        I'm a little bit corny<br/>
        I'm a wildwood flower<br/>
        Waving for you<br/>
        Broadcasting tower<br/>
        Waving for you
      </p>
      <p><cite>You Turn Me On, I'm A Radio, Joni Mitchell</cite></p>
    </blockquote>
  </div>;
