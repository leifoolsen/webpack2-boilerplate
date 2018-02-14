import app from '../styles/app/app.css';
import button from '../components/button.css';

/** @jsx h */
import {h} from 'hyperapp';
import Button from '../components/Button'; // eslint-disable-line no-unused-vars
import Counter from '../components/Counter'; // eslint-disable-line no-unused-vars

export const Home = ({state, actions}) =>
  <div>
    <h2>Example application built with Hyperapp</h2>

    <br/>
    <Counter num={state.num} add={actions.add} sub={actions.sub}/>

    <br/>
    <br/>
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button id="btn-ping" className={button['Button-primary']} stroked onclick={ (e) => actions.ping(e) }>
        Ping
      </Button>
      <p id="ping-response">{state.response}</p>
    </div>

    <br/>
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button className={button['Button-primary']} stroked onclick={ (e) => actions.triggerUnhandledError(e) }>
        Unhandled error!
      </Button>
      <p>{state.unhandledErrorResponse}</p>
    </div>

    <br/>
    <br/>
    <figure class={app.logobar}>
      <img
        src="/assets/webpack-logo.svg"
        alt="Webpack logo"
        title="Webpack logo. Image copied from: https://webpack.js.org/"
      />

      <img
        src="/assets/js.jpg"
        alt="JavaScript Logo"
        title="JavaScript Logo. Image copied from: https://github.com/voodootikigod/logo.js"
      />

      <img
        src="/assets/HTML5_logo_and_wordmark.png"
        alt="HTML 5 logo"
        title="HTML 5 logo. Image copied from: https://commons.wikimedia.org/wiki/File:HTML5_logo_and_wordmark.svg"
      />

      <img
        src="/assets/css4.png"
        alt="CSS 4 logo"
        title="CSS 4 logo. Image copied from: http://end3r.com/slides/meet-css4/"
      />

      <img
        src="/assets/postcss-logo.svg"
        alt="postcss logo"
        title="Postcss logo. Image copied from: https://github.com/postcss/postcss"
      />

      <img
        src="/assets/css-modules-logo.png"
        alt="css-modules logo"
        title="Css-modules logo. Image copied from: https://github.com/css-modules/css-modules"
      />

      <img
        src="/assets/hyperapp.png"
        alt="Hyperapp logo"
        title="Hyperapp logo. Image copied from: https://github.com/hyperapp"
      />

    </figure>
  </div>;
