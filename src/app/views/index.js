import '../styles/base/helpers.css';
import layout from '../styles/layout/layout.css';

import {h} from 'hyperapp';
/** @jsx h */

import { Home } from './Home'; // eslint-disable-line no-unused-vars
import { Typography } from './Typography'; // eslint-disable-line no-unused-vars
import { Demo } from './Demo'; // eslint-disable-line no-unused-vars

const showPage = (state, actions) => {

  const body = document.querySelector('body');
  if(state.gridLines) {
    body.classList.add('grid-lines');
  }
  else {
    body.classList.remove('grid-lines');
  }

  // The router is not compatible with latest HyperApp
  // Use this while waiting for the HypoerApp router to catch up
  const page = state.page;
  history.pushState(null, null, page);

  if ('/typography' === page) {
    return <Typography />;
  }
  else if ('/demo' === page) {
    return <Demo />;
  }
  return <Home state={state} actions={actions}/>;
};

export const view = (state, actions) =>
  <div class={layout.Layout}>
    <header class={layout['Layout-top']} role="banner" style={{background: 'hsla(360, 100%, 50%, .7)', color: 'yellow'}}>
      <h1>Webpack Boilerplate</h1>
    </header>
    <div class={layout['Layout-body']}>

      <main class={layout['Layout-main']} role="main">
        {
          showPage(state, actions)
        }
      </main>

      <section class={layout['Layout-sidebarLeft']} style={{background: 'hsla(120, 100%, 50%, .8)', display: 'flex', flexDirection: 'column'}}>
        <p>Menu</p>
        <ul class="unstyled-list">
          <li>
            <a href="/" onclick={e => actions.page(e)}>Home</a>
          </li>
          <li>
            <a href="/typography" onclick={e => actions.page(e)}>Typography</a>
          </li>
          <li>
            <a href="/demo" onclick={e => actions.page(e)}>Demo</a>
          </li>
          <li>
            <a href="#" onclick={e => actions.toggleGridLines(e)}>Toggle grid lines</a>
          </li>
        </ul>
        <footer style={{display: 'flex', justifyContent: 'space-between', marginTop: 'auto'}}>
          <img src="/assets/webpack-logo.png" alt="Webpack Logo" style={{height: '1.5rem'}} />
          <img src="/assets/js.jpg" alt="JavaScript Logo" style={{height: '1.5rem'}} />
          <img src="/assets/postcss-logo.svg" alt="postcss logo" style={{height: '1.5rem'}} />
          <img src="/assets/hyperapp.png" alt="Hyperapp" style={{height: '1.5rem'}} />
          <img src="/assets/HolyGrail.svg.png" alt="Holy Grail Logo" style={{height: '1.5rem'}} />
        </footer>
      </section>

      <aside class={layout['Layout-sidebarRight']} role="complementary" style={{background: 'hsla(213, 100%, 50%, .8)', color: 'yellow'}}>
        <p>Ads</p>
      </aside>
    </div>
    <footer class={layout['Layout-bottom']} role="contentinfo" style={{background: 'hsla(180, 100%, 50%, .8)', display: 'flex', alignItems: 'center'}}>
      <h2 style={{flex: '1'}}>Footer</h2>
      <p><strong>Material icons:&nbsp;</strong></p>
      <span style={{lineHeight: '1'}}>
        <i class="material-icons">face</i>
        <i class="material-icons">all_inclusive</i>
        <i class="material-icons">share</i>
        <i class="material-icons">arrow_back</i>
        <i class="material-icons">arrow_forward</i>
        <i class="material-icons">check</i>
        <i class="material-icons">close</i>
        <i class="material-icons">android</i>
        <i class="material-icons">menu</i>
      </span>
    </footer>
  </div>;
