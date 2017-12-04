import {h} from 'hyperapp';
/** @jsx h */

const paragraph1 = () =>
  <p>Unlike responsive typography, which changes only at set breakpoints,
    fluid typography resizes smoothly to match any device width. It is an
    intuitive option for a web in which we have a practically infinite
    number of screen sizes to support. Yet, for some reason, it is still
    used far less than responsive techniques.
  </p>;

export const Typography = () =>
  <div>
    <section>
      <h1>Responsive Font Size And Fluid Typography With vh And vw Units</h1>
      { paragraph1() }
      <p>
        This might be because typography is so deeply rooted in the
        centuries-old history of typesetting. The concept of having “fluid”
        anything is often at odds with this tradition. In print, dimensions
        have always been fixed, but they don’t need to be on the web. That’s
        why fluid typography could be a perfect match for the web. It’s a
        different approach for a completely different medium.
      </p>
      <p>If you would like to know more about this technique, read the Smashing
        Magazine artiche <a href="https://www.smashingmagazine.com/2016/05/fluid-typography/">
          Responsive Font Size And Fluid Typography With vh And vw Units</a>
      </p>
    </section>

    <section>
      <br/>
      <header><h1>Heading 1</h1></header>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </section>

    <section>
      <br/>
      <header><h2>Paragraphs</h2></header>
      { paragraph1() }
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
        aperiam voluptates sequi repellat esse nam magni amet voluptate libero?
        Illum, quaerat suscipit magnam fuga quisquam non dignissimos rerum sunt
        qui.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea veniam
        asperiores labore ratione nostrum autem maiores aliquam similique quos ex
        adipisci nihil optio voluptates, fugiat, in illo! Provident, vitae,
        voluptate!</p>
    </section>

    <section>
      <br/>
      <header><h2>Blockquotes</h2></header>
      <blockquote>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          molestias repellendus vel nam aperiam veritatis quia repellat asperiores
          voluptate commodi. Consequuntur ratione et modi id, magnam reiciendis
          illum maxime minus.</p>
        <p><cite>Citation</cite></p>

      </blockquote>
    </section>

    <section>
      <br/>
      <header><h2>Definition list</h2></header>
      <dl>
        <dt>Definition List Title</dt>
        <dd>Definition List Description</dd>
      </dl>
      <header><h2>Ordered List</h2></header>
      <ol>
        <li>List Item 1</li>
        <li>List Item 2</li>
        <li>List Item 3</li>
      </ol>
      <header><h2>Unordered List</h2></header>
      <ul>
        <li>List Item 1</li>
        <li>List Item 2</li>
        <li>List Item 3</li>
      </ul>
    </section>

    <section>
      <br/>
      <header><h2>Inline elements</h2></header>
      <p><a href="#!">This is a text link</a>.</p>
      <p><strong>Strong is used to indicate strong importance.</strong></p>
      <p><em>This text has added emphasis.</em></p>
      <p>The <b>b element</b> is stylistically different text from normal text,
        without any special importance.</p>
      <p>The <i>i element</i> is text that is offset from the normal text.</p>
      <p>The <u>u element</u> is text with an unarticulated, though explicitly
        rendered, non-textual annotation.</p>
      <p>
        <del>This text is deleted</del>
        and
        <ins>This text is inserted</ins>
        .
      </p>
      <p><s>This text has a strikethrough</s>.</p>
      <p>Superscript<sup>®</sup>.</p>
      <p>Subscript for things like H<sub>2</sub>O.</p>
      {/* TODO: Fix styling for this
      <p>
        <small>This small text is small for for fine print, etc.</small>
      </p>
      */}
      <p>Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr></p>
      <p><q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This
        text is a short inline quotation.</q></p>
      <p><cite>This is a citation.</cite></p>
      <p>The <dfn>dfn element</dfn> indicates a definition.</p>
      <p>The <mark>mark element</mark> indicates a highlight.</p>
      <p>The <var>variable element</var>, such as <var>x</var> = <var>y</var>.</p>
      <p>The time element:
        <time datetime="2013-04-06T12:32+00:00">2 weeks ago</time>
      </p>
    </section>

    <section>
      <br/>
      <header><h1>Form elements</h1></header>
      <br />
      <fieldset>
        <legend>Input fields</legend>
        <div class="clearfix">
          <label for="input__text">Text Input:&nbsp;</label>
          <input id="input__text" type="text" placeholder="Text Input"/>
        </div>
        <br/>
        <div class="clearfix">
          <label for="input__password">Password:&nbsp;</label>
          <input id="input__password" type="password" placeholder="Type your Password"/>
        </div>
        <br/>
        <div class="clearfix">
          <label for="input__webaddress">Web Address:&nbsp;</label>
          <input id="input__webaddress" type="url" placeholder="http://yoursite.com"/>
        </div>
        <br/>
        <div class="clearfix">
          <label for="input__emailaddress">Email Address:&nbsp;</label>
          <input id="input__emailaddress" type="email" placeholder="name@email.com"/>
        </div>
        <br/>
        <div class="clearfix">
          <label for="input__phone">Phone Number:&nbsp;</label>
          <input id="input__phone" type="tel" placeholder="(999) 999-9999"/>
        </div>
        <br/>
        <div class="clearfix">
          <label for="input__search">Search:&nbsp;</label>
          <input id="input__search" type="search" placeholder="Enter Search Term"/>
        </div>
        <br/>
        <div class="clearfix">
          <label for="input__text2">Number Input:&nbsp;</label>
          <input id="input__text2" type="number" placeholder="Enter a Number"/>
        </div>
        <br/>
        <div class="clearfix">
          <label for="input__text-disabled">Text Input:&nbsp;</label>
          <input id="input__text-disabled" type="text" value="Disabled" disabled/>
        </div>
      </fieldset>

      <p>It's not required to put form elements inside a fieldset</p>
      <div class="clearfix">
        <label for="input__text2">Text Input:&nbsp;</label>
        <input id="input__text2" type="text" placeholder="Text Input"/>
      </div>

      <br/>
      <fieldset class="clearfix">
        <legend>Textarea</legend>
        <label for="textarea">Textarea:&nbsp;</label>
        <textarea id="textarea" rows="5" placeholder="Enter your message here" />
      </fieldset>

      <br/>

      <fieldset class="clearfix">
        <legend>Select menus</legend>
        <div class="clearfix">
          <label for="select">Select:&nbsp;</label>
          <select id="select">
            <optgroup label="Option Group">
              <option>Option One</option>
              <option>Option Two</option>
              <option>Option Three</option>
            </optgroup>
          </select>
        </div>
        <br/>
        <div class="clearfix">
          <label for="select__multiple">Multiple</label>
          <select id="select__multiple" multiple="multiple" size="5">
            <optgroup label="Option Group">
              <option>Option One</option>
              <option>Option Two</option>
              <option>Option Three</option>
              <option>Option Four</option>
              <option>Option Five</option>
              <option>Option Six</option>
              <option>Option Seven</option>
            </optgroup>
          </select>
        </div>
      </fieldset>

      <br/>
      <fieldset class="clearfix">
        <legend>Checkboxes and Radiobuttons</legend>
        <div class="clearfix">
          <p>Checkboxes</p>
          <label for="checkbox1">
            <input id="checkbox1" type="checkbox" checked="checked"/>&nbsp;Choice 1&nbsp;
          </label>
          <label for="checkbox2">
            <input id="checkbox2" type="checkbox"/>&nbsp;Choice 2&nbsp;
          </label>
          <label for="checkbox3">
            <input id="checkbox3" type="checkbox"/>&nbsp;Choice 3&nbsp;
          </label>
        </div>

        <br/>
        <div class="clearfix">
          <p>Radiobuttons</p>
          <label for="radio1">
            <input id="radio1" name="radio__a" type="radio" checked="checked"/>&nbsp;Option 1&nbsp;
          </label>
          <label for="radio2">
            <input id="radio2" name="radio__a" type="radio"/>&nbsp;Option 2&nbsp;
          </label>
          <label for="radio3">
            <input id="radio3" name="radio__a" type="radio"/>&nbsp;Option 3&nbsp;
          </label>
        </div>
      </fieldset>

      <br/>
      <fieldset class="clearfix">
        <legend>Buttons</legend>
        <input type="submit" value="Input Submit"/>
        <button type="submit">Button Submit</button>
        <button type="button">Button</button>
        <button type="button" disabled>Disabled</button>
      </fieldset>
    </section>
  </div>;
