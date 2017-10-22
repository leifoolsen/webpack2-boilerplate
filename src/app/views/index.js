import {h} from 'hyperapp';
/** @jsx h */

import './view.css';

// eslint-disable-next-line no-unused-vars
const Header = () =>
  <header class="masthead">
    <div class="masthead__left-section">
      <div class="masthead__logo" />
    </div>
    <div class="masthead__diagonal" />
    <div class="masthead__right-section">
      <h1>Webpack Boilerplate</h1>
    </div>
  </header>;

// eslint-disable-next-line no-unused-vars
const Footer = () =>
  <footer class="mastfoot mastfoot--demo">
    <p>Material Icons:&nbsp;</p>
    <span>
      <i class="material-icons md-dark">face</i>
      <i class="material-icons md-dark md-inactive">face</i>
      <i class="material-icons orange600">face</i>
      <i class="material-icons">all_inclusive</i>
      <i class="material-icons">share</i>
      <i class="material-icons">arrow_back</i>
      <i class="material-icons">arrow_forward</i>
      <i class="material-icons">check</i>
      <i class="material-icons">close</i>
      <i class="material-icons">android</i>
      <i class="material-icons">menu</i>
    </span>
  </footer>;

// eslint-disable-next-line no-unused-vars
const Sidebar = () =>
  <aside class="layout__sidebar-left layout__sidebar-left--demo">
    <p>Left Sidebar</p>

    <footer class="layout__sidebar-left--demo__footer" role="contentinfo">
      <img src="/assets/webpack-logo.png" alt="Webpack Logo"/>
      <img src="/assets/HTML5_logo_and_wordmark.svg" alt="HTML 5 Logo"/>
      <img src="/assets/js.jpg" alt="JavaScript Logo"/>
      <img src="/assets/logo-b6e1ef6e.svg" alt="SASS Logo"/>
      <img src="/assets/HolyGrail.svg.png" alt="Holy Grail Logo"/>
    </footer>
  </aside>;


export const view = (state, actions) => (

  <div class="layout">

    <Header />

    <div class="layout__body">
      <div class="layout__wrapper">

        <main id="app" class="layout__content layout__content--demo">

          <div class="demo-card">
            <a class="demo-card__left" href="https://webpack.github.io/" title="Image copied from: webpack">
              <img src="/assets/webpack-logo.png" alt="Webpack logo"/>
            </a>
            <div class="demo-card__right">
              <p><a href="https://webpack.js.org/">Webpack</a></p>
            </div>
          </div>

          <div class="demo-card">
            <a  class="demo-card__left" href="https://commons.wikimedia.org/wiki/File:HTML5_logo_and_wordmark.svg" title="Image copied from: Wikimedia Commons">
              <img src="/assets/HTML5_logo_and_wordmark.svg" alt="HTML 5 logo"/>
            </a>
            <div class="demo-card__right">
              <p><a href="https://www.w3.org/TR/html5/">HTML 5</a></p>
            </div>
          </div>

          <div class="demo-card">
            <a class="demo-card__left" href="https://github.com/voodootikigod/logo.js" title="Image copied from: JS Logo By The Community">
              <img src="/assets/js.jpg" alt="JavaScript Logo"/>
            </a>
            <div class="demo-card__right">
              <p><a href="http://www.ecma-international.org/ecma-262/6.0/">ECMAScript 2015</a></p>
            </div>
          </div>

          <div class="demo-card">
            <a class="demo-card__left" href="http://sass-lang.com/" title="Image copied from: sass-lang.com">
              <img src="/assets/logo-b6e1ef6e.svg" alt="SASS logo"/>
            </a>
            <div class="demo-card__right">
              <p><a href="https://github.com/HugoGiraudel/sass-boilerplate">SASS Boilerplate</a></p>
            </div>
          </div>

          <div class="demo-card">
            <a class="demo-card__left" href="http://www.wikiwand.com/en/Holy_Grail_(web_design)" title="Image copied from: Holy Grail (web design)">
              <img src="/assets/HolyGrail.svg.png" alt="Holy Grail logo"/>
            </a>
            <div class="demo-card__right">
              <a href="https://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/">
                Layout based on Solved by Flexbox, Holy Grail Layout
              </a>
            </div>
          </div>

          <div class="demo-card">
            <div class="demo-card__left">
              <button id="btn-ping" onclick={actions.ping}>Ping</button>
            </div>
            <div class="demo-card__right">
              <p id="ping-response">{state.response}</p>
            </div>
          </div>

          <div class="demo-card">
            <div class="demo-card__right">
              <button id="btn-unhandled-error" onclick={actions.triggerUnhandledError}>Unhandled error!</button>
              <p id="unhandled-error-response" style={{marginLeft: '16px'}}>{state.unhandledErrorResponse}</p>
            </div>
          </div>

        </main>

        <Footer />

      </div>

      <Sidebar />

    </div>

  </div>
);

