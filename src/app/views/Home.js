import card from '../components/card.css';

import {h} from 'hyperapp';
/** @jsx h */

export const Home = ({state, actions}) =>
  <div>
    <div class={card.Card}>
      <figure class={card['Card-figure']}>
        <a href="https://github.com/webpack/webpack" title="Image copied from: webpack">
          <img src="/assets/webpack-logo.png" alt="Webpack logo"/>
        </a>
      </figure>
      <div class={card['Card-body']}>
        <p><a href="https://webpack.js.org/">Webpack3</a> with <a href="https://expressjs.com/">Node Express</a> middleware</p>
      </div>
    </div>

    <div class={card.Card}>
      <figure class={card['Card-figure']}>
        <a href="https://github.com/voodootikigod/logo.js"
          title="Image copied from: JS Logo By The Community">
          <img src="/assets/js.jpg" alt="JavaScript Logo"/>
        </a>
      </figure>
      <div class={card['Card-body']}>
        <p>ECMAScript&nbsp;
          <a href="https://www.ecma-international.org/ecma-262/6.0/">2015</a>,&nbsp;
          <a href="https://www.ecma-international.org/ecma-262/7.0/">2016</a>,&nbsp;
          <a href="https://www.ecma-international.org/ecma-262/8.0/">2017</a>
        </p>
      </div>
    </div>

    <div class={card.Card}>
      <figure class={card['Card-figure']}>
        <a href="https://commons.wikimedia.org/wiki/File:HTML5_logo_and_wordmark.svg"
          title="Image copied from: Wikimedia Commons">
          <img src="/assets/HTML5_logo_and_wordmark.png" alt="HTML 5 logo"/>
        </a>
      </figure>
      <figure class={card['Card-figure']}>
        <a href="https://github.com/postcss/postcss"
          title="Image copied from: postcss">
          <img src="/assets/postcss-logo.svg" alt="postcss logo"/>
        </a>
      </figure>
      <figure class={card['Card-figure']}>
        <a href="https://github.com/css-modules/css-modules"
          title="Image copied from: css-modules">
          <img src="/assets/css-modules-logo.png" alt="css-modules logo"/>
        </a>
      </figure>
      <div class={card['Card-body']}>
        <p>
          <a href="https://www.w3.org/TR/html5/">HTML 5</a>,&nbsp;
          <a href="http://postcss.org/">PostCSS</a>,&nbsp;
          <a href="http://cssnext.io/">cssnext</a>,&nbsp;
          <a href="https://github.com/css-modules/css-modules">CSS Modules</a>
        </p>
      </div>
    </div>

    <div class={card.Card}>
      <figure class={card['Card-figure']}>
        <a href="https://github.com/hyperapp"
          title="Image copied from: Hyperapp">
          <img src="/assets/hyperapp.png" alt="Hyperapp logo"/>
        </a>
      </figure>
      <div class={card['Card-body']}>
        <p>
          Demo application built with <a href="https://hyperapp.js.org/">Hyperapp</a>
        </p>
      </div>
    </div>

    <div class={card.Card}>
      <figure class={card['Card-figure']}>
        <a href="http://www.wikiwand.com/en/Holy_Grail_(web_design)"
          title="Image copied from: Holy Grail (web design)">
          <img src="/assets/HolyGrail.svg.png" alt="Holy Grail logo"/>
        </a>
      </figure>
      <div class={card['Card-body']}>
        <p>
          Example layout based on &nbsp;
          <a href="https://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/">
            Solved by Flexbox, Holy Grail Layout
          </a>
        </p>
      </div>
    </div>

    <div class={card.Card}>
      <div class={card['Card-figure']}>
        <button id="btn-ping" onclick={actions.ping}>Ping</button>
      </div>
      <div class={card['Card-body']}>
        <span id="ping-response">{state.response}</span>
      </div>
    </div>

    <div class={card.Card}>
      <div class={card['Card-figure']}>
        <button onclick={ e => actions.triggerUnhandledError({e}) }>
          Unhandled error!!!
        </button>
      </div>
      <div class={card['Card-body']}>
        <span>{state.unhandledErrorResponse}</span>
      </div>
    </div>

  </div>;
