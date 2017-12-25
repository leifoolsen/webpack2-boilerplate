import layout from '../styles/layout/layout.css';
import app from '../styles/app/app.css';
import header from '../styles/app/masthead.css';
import footer from '../styles/app/mastfoot.css';

/** @jsx h */
import {h} from 'hyperapp';
import { Link, Route } from '@hyperapp/router'; // eslint-disable-line no-unused-vars
import { Home } from './Home'; // eslint-disable-line no-unused-vars
import { Typography } from './Typography'; // eslint-disable-line no-unused-vars
import { Colors } from './Colors'; // eslint-disable-line no-unused-vars
import { Buttons } from './Buttons'; // eslint-disable-line no-unused-vars
import { Elevations } from './Elevations'; // eslint-disable-line no-unused-vars

export const view = (state, actions) => {

  const body = document.querySelector('body');
  if (state.gridLines) {
    body.classList.add('grid-lines');
  }
  else {
    body.classList.remove('grid-lines');
  }

  return (
    <div class={layout.Layout}>

      <header class={header.Masthead} role="banner">
        <div class={header['Masthead-logo']} role="img" aria-label="Boilerplate logo" />
        <h2>Webpack Boilerplate</h2>
        <div class={header['Masthead-logo2']} role="img" aria-label="Red throated loon. Copyright &copy; Leif Olsen" />
      </header>

      <div class={layout['Layout-body']}>

        <main class={layout['Layout-main']} role="main">
          <Route path="/" render={() => Home({state, actions})}/>
          <Route path="/typography" render={Typography}/>
          <Route path="/colors" render={Colors}/>
          <Route path="/elevations" render={Elevations}/>
          <Route path="/buttons" render={Buttons}/>
        </main>

        <section role="navigation" class={layout['Layout-sidebarLeft']} style={{opacity: 0.9}}>
          <Link
            to="/"
            class={app.navlink}
          >
            Home
          </Link>
          <Link
            to="/typography"
            class={app.navlink}
          >
            Typography
          </Link>
          <Link
            to="/colors"
            class={app.navlink}
          >
            Colors
          </Link>
          <Link
            to="/elevations"
            class={app.navlink}
          >
            Elevation
          </Link>
          <Link
            to="/buttons"
            class={app.navlink}
          >
            Buttons
          </Link>
          <a
            href="#"
            class={app.navlink}
            onclick={e => actions.toggleGridLines(e)}
          >
            Toggle grid lines
          </a>
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
    </div>
  );
};
