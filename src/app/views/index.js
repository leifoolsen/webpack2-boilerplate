import layout from '../styles/layout/layout.css';
import header from '../styles/app/masthead.css';
import footer from '../styles/app/mastfoot.css';
import button from '../../app/components/button.css';

/** @jsx h */
import {h} from 'hyperapp';

import classnames from '../../utils/classnames';
import { Home } from './Home'; // eslint-disable-line no-unused-vars
import { Typography } from './Typography'; // eslint-disable-line no-unused-vars
import { Colors } from './Colors'; // eslint-disable-line no-unused-vars
import { Buttons } from './Buttons'; // eslint-disable-line no-unused-vars

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
  else if ('/colors' === page) {
    return <Colors />;
  }
  else if ('/buttons' === page) {
    return <Buttons />;
  }
  return <Home state={state} actions={actions}/>;
};

export const view = (state, actions) =>
  <div class={layout.Layout}>

    <header class={header.Masthead} role="banner">
      <div class={header['Masthead-logo']} role="img" aria-label="Boilerplate logo"></div>
      <h2>Webpack Boilerplate</h2>
    </header>

    <div class={layout['Layout-body']}>

      <main class={layout['Layout-main']} role="main">
        {
          showPage(state, actions)
        }
      </main>

      <section class={layout['Layout-sidebarLeft']} style={{opacity: 0.9}}>
        <div>
          <a href="/"
            class={classnames(button['Button-primary'], button['Button--compact'])}
            style={{width: '100%', textAlign: 'left'}}
            onclick={e => actions.page(e)}
          >
            Home
          </a>
          <a href="/typography"
            class={classnames(button['Button-primary'], button['Button--compact'])}
            style={{width: '100%', textAlign: 'left'}}
            onclick={e => actions.page(e)}
          >
            Typography
          </a>
          <a href="/colors"
            class={classnames(button['Button-primary'], button['Button--compact'])}
            style={{width: '100%', textAlign: 'left'}}
            onclick={e => actions.page(e)}
          >
            Colors
          </a>
          <a href="/buttons"
            class={classnames(button['Button-primary'], button['Button--compact'])}
            style={{width: '100%', textAlign: 'left'}}
            onclick={e => actions.page(e)}
          >
            Buttons
          </a>
          <a href="#"
            class={classnames(button['Button-primary'], button['Button--compact'])}
            style={{width: '100%', textAlign: 'left'}}
            onclick={e => actions.toggleGridLines(e)}
          >
            Toggle grid lines
          </a>
        </div>
      </section>
    </div>
    <footer class={footer.Mastfoot} role="contentinfo">
      <h3 style={{flex: '1'}}>Footer</h3>
      <h4>
        <i class="material-icons">face</i>
        <i class="material-icons">all_inclusive</i>
        <i class="material-icons">share</i>
        <i class="material-icons">arrow_back</i>
        <i class="material-icons">arrow_forward</i>
        <i class="material-icons">check</i>
        <i class="material-icons">close</i>
        <i class="material-icons">android</i>
        <i class="material-icons">menu</i>
      </h4>
    </footer>
  </div>;
