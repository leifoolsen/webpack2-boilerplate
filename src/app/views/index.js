import layout from '../../styles/layout/layout.css';

import {h} from 'hyperapp';
/** @jsx h */

export const view = (/*state, actions*/) => (
  <div class={layout.layout}>
    <header class={layout['layout-top']} style={{background: 'hsla(360, 100%, 50%, .7)', color: 'yellow'}}>
      <h1>Header</h1>
    </header>
    <div class={layout['layout-body']}>
      <main class={layout['layout-main']}>
        <h1>H1: Responsive Font Size And Fluid Typography With vh And vw Units</h1>
        <p>Unlike responsive typography, which changes only at set breakpoints,
          fluid typography resizes smoothly to match any device width. It is an
          intuitive option for a web in which we have a practically infinite
          number of screen sizes to support. Yet, for some reason, it is still
          used far less than responsive techniques.
        </p>
        <p>
          This might be because typography is so deeply rooted in the
          centuries-old history of typesetting. The concept of having “fluid”
          anything is often at odds with this tradition. In print, dimensions
          have always been fixed, but they don’t need to be on the web. That’s
          why fluid typography could be a perfect match for the web. It’s a
          different approach for a completely different medium.
        </p>
        <p>If you want to know more about this technique, read the Smashing
          Magazine artiche <a href="https://www.smashingmagazine.com/2016/05/fluid-typography/">
            Responsive Font Size And Fluid Typography With vh And vw Units</a>
        </p>
        <h2>H2: Responsive Font Size And Fluid Typography With vh And vw Units</h2>
        <p>Unlike responsive typography, which changes only at set breakpoints,
          fluid typography resizes smoothly to match any device width. It is an
          intuitive option for a web in which we have a practically infinite
          number of screen sizes to support. Yet, for some reason, it is still
          used far less than responsive techniques.
        </p>
        <h3>H3: Responsive Font Size And Fluid Typography With vh And vw Units</h3>
        <p>Unlike responsive typography, which changes only at set breakpoints,
          fluid typography resizes smoothly to match any device width. It is an
          intuitive option for a web in which we have a practically infinite
          number of screen sizes to support. Yet, for some reason, it is still
          used far less than responsive techniques.
        </p>
        <h4>H4: Responsive Font Size And Fluid Typography With vh And vw Units</h4>
        <p>Unlike responsive typography, which changes only at set breakpoints,
          fluid typography resizes smoothly to match any device width. It is an
          intuitive option for a web in which we have a practically infinite
          number of screen sizes to support. Yet, for some reason, it is still
          used far less than responsive techniques.
        </p>
        <h5>H5: Responsive Font Size And Fluid Typography With vh And vw Units</h5>
        <p>Unlike responsive typography, which changes only at set breakpoints,
          fluid typography resizes smoothly to match any device width. It is an
          intuitive option for a web in which we have a practically infinite
          number of screen sizes to support. Yet, for some reason, it is still
          used far less than responsive techniques.
        </p>
        <h6>H6: Responsive Font Size And Fluid Typography With vh And vw Units</h6>
        <p>Unlike responsive typography, which changes only at set breakpoints,
          fluid typography resizes smoothly to match any device width. It is an
          intuitive option for a web in which we have a practically infinite
          number of screen sizes to support. Yet, for some reason, it is still
          used far less than responsive techniques.
        </p>
      </main>
      <section class={layout['layout-sidebar-left']} style={{background: 'hsla(120, 100%, 50%, .8)'}}>
        <p>Nav</p>
      </section>
      <aside class={layout['layout-sidebar-right']} style={{background: 'hsla(213, 100%, 50%, .8)', color: 'yellow'}}>
        <p>Ads</p>
      </aside>
    </div>
    <footer class={layout['layout-bottom']} style={{background: 'hsla(180, 100%, 50%, .8)'}}>
      <h2>Footer</h2>
    </footer>
  </div>
);

