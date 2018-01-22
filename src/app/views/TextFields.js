import textfield from '../components/textfield.css';

/** @jsx h */
import { h } from 'hyperapp';
import TextField from '../../app/components/TextField'; // eslint-disable-line no-unused-vars

export const TextFields = () =>
  <div>
    <h1>Text Fields</h1>
    <p>Text fields allow users to input, edit, and select text.</p>
    <h3>CSS only</h3>
    <br/>
    <div class={textfield.TextField}>
      <input class={textfield.TextField__input} id="input_text" type="text" placeholder="Type some text"/>
      <label class={textfield.TextField__label} for="input_text">Text Input</label>
      <div class={textfield['TextField__bottom-line']} />
    </div>
    <br/>

    <div class={textfield.TextField}>
      <input class={textfield.TextField__input} id="input__text_d" type="text" value="A disabled text" disabled/>
      <label class={textfield.TextField__label} for="input__text_d">Disabled Text field</label>
      <div class={textfield['TextField__bottom-line']} />
    </div>

    <br/>
    <div style={{display: 'flex', alignItems: 'flex-end'}}>
      <label for="input_text2">Text Input:&nbsp;</label>
      <div class={textfield.TextField}>
        <input class={textfield.TextField__input} id="input_text2" type="text" placeholder="Type something"/>
        <div class={textfield['TextField__bottom-line']} />
      </div>
    </div>

    <h3>&lt;TextField&gt; component</h3>
    <br/>
    <TextField floatingLabel label="TextField label" placeholder="Type some letters"/>

    <br/>
    <blockquote>
      <p>
        Sometimes it gets real hard,<br/>
        And I need some kind of output.<br/>
        For input twice the size of my one inch mind.
      </p>
      <p><cite>On The Wagon, Green Day</cite></p>
    </blockquote>
  </div>;
